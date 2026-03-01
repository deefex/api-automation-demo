import nock from "nock";
import { PetstoreClient } from "../../src/client/petstoreClient.js";
import { PetBuilder } from "../builders/petBuilder.js";

/**
 * Mocked contract coverage for Petstore interactions.
 * Uses Nock to keep assertions deterministic and independent of network state.
 */
describe("PetstoreClient mock tests", () => {
  const baseUrl = "https://petstore.swagger.io/v2";
  const client = new PetstoreClient(baseUrl);

  /**
   * Verifies POST request/response handling with nested payload fields.
   */
  it("creates a pet from a mocked POST response", async () => {
    const payload = new PetBuilder()
      .withId(1001)
      .withName("Pixel")
      .withCategory(10, "dogs")
      .withPhotoUrls(["https://example.com/pixel.png"])
      .withTags([{ id: 1, name: "friendly" }])
      .build();

    nock(baseUrl).post("/pet", payload).reply(200, payload);

    const pet = await client.createPet(payload);

    expect(pet.id).toBe(1001);
    expect(pet.name).toBe("Pixel");
    expect(pet.tags?.[0]?.name).toBe("friendly");
  });

  /**
   * Verifies error propagation when the API returns a 404 response.
   */
  it("handles service errors for GET", async () => {
    const petId = 404404;

    nock(baseUrl).get(`/pet/${petId}`).reply(404, {
      code: 1,
      type: "error",
      message: "Pet not found"
    });

    await expect(client.getPetById(petId)).rejects.toThrow();
  });

  /**
   * Verifies local schema validation catches invalid input before HTTP execution.
   */
  it("rejects invalid payloads before network call", async () => {
    const invalidPayload = { ...new PetBuilder().build(), name: undefined };

    await expect(client.createPet(invalidPayload as never)).rejects.toThrow();
  });
});
