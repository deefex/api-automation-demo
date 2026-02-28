import nock from "nock";
import { PetstoreClient } from "../../src/client/petstoreClient.js";
import { PetBuilder } from "../builders/petBuilder.js";

describe("PetstoreClient mock tests", () => {
  const baseUrl = "https://petstore.swagger.io/v2";
  const client = new PetstoreClient(baseUrl);

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

  it("handles service errors for GET", async () => {
    const petId = 404404;

    nock(baseUrl).get(`/pet/${petId}`).reply(404, {
      code: 1,
      type: "error",
      message: "Pet not found"
    });

    await expect(client.getPetById(petId)).rejects.toThrow();
  });

  it("rejects invalid payloads before network call", async () => {
    const invalidPayload = { ...new PetBuilder().build(), name: undefined };

    await expect(client.createPet(invalidPayload as never)).rejects.toThrow();
  });
});
