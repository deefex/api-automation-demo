import { PetstoreClient } from "../../src/client/petstoreClient.js";
import { config } from "../../src/config/env.js";
import { PetBuilder } from "../builders/petBuilder.js";

describe("PetstoreClient live tests", () => {
  const client = new PetstoreClient(config.petstoreBaseUrl);
  const payload = new PetBuilder().build();
  const petId = payload.id;

  const missingPetId = petId + 9_000_000;

  afterAll(async () => {
    try {
      await client.deletePet(petId);
    } catch {
      // Cleanup should never fail the suite.
    }
  });

  it("POST /pet creates a pet with complex nested payload", async () => {
    const created = await client.createPet(payload);

    expect(created.id).toBe(petId);
    expect(created.category?.name).toBe("portfolio");
    expect(created.tags).toHaveLength(2);
    expect(created.tags?.map((tag) => tag.name)).toContain("automation");
  });

  it("GET /pet/{petId} retrieves the newly created pet", async () => {
    await client.createPet(payload);
    const fetched = await client.getPetById(petId);

    expect(fetched.id).toBe(petId);
    expect(fetched.name).toBe("CodexDemoPet");
    expect(fetched.photoUrls[0]).toBe("https://example.com/codex-demo-pet.png");
  });

  it("captures a full-response approval snapshot", async () => {
    await client.createPet(payload);
    const fetched = await client.getPetById(petId);

    // Snapshot approval gives a full-response verification baseline.
    expect({ ...fetched, id: 0 }).toMatchSnapshot();
  });

  it("returns an error for a non-existent pet id", async () => {
    await expect(client.getPetById(missingPetId)).rejects.toThrow();
  });

  it("rejects invalid payloads before sending requests", async () => {
    const invalidPayload = { ...new PetBuilder().build(), name: undefined };

    await expect(client.createPet(invalidPayload as never)).rejects.toThrow();
  });
});
