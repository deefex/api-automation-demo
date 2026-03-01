import type { CreatePetRequest } from "../../src/models/pet.js";

let sequence = 0;

function nextPetId(): number {
  sequence += 1;
  return Date.now() + sequence;
}

/**
 * Fluent builder for Petstore request payloads used in tests.
 * Provides sensible defaults and allows targeted overrides per test.
 */
export class PetBuilder {
  private pet: CreatePetRequest = {
    id: nextPetId(),
    category: { id: 99, name: "portfolio" },
    name: "CodexDemoPet",
    photoUrls: ["https://example.com/codex-demo-pet.png"],
    tags: [
      { id: 100, name: "api" },
      { id: 101, name: "automation" }
    ],
    status: "available"
  };

  /**
   * Overrides the pet id.
   * @param id Unique pet identifier.
   */
  withId(id: number): PetBuilder {
    this.pet.id = id;
    return this;
  }

  /**
   * Overrides the pet name.
   * @param name Display name for the pet.
   */
  withName(name: string): PetBuilder {
    this.pet.name = name;
    return this;
  }

  /**
   * Overrides the category fields.
   * @param id Category id.
   * @param name Category name.
   */
  withCategory(id: number, name: string): PetBuilder {
    this.pet.category = { id, name };
    return this;
  }

  /**
   * Overrides all photo URLs.
   * @param photoUrls Ordered list of image URLs.
   */
  withPhotoUrls(photoUrls: string[]): PetBuilder {
    this.pet.photoUrls = photoUrls;
    return this;
  }

  /**
   * Overrides all pet tags.
   * @param tags Tag list.
   */
  withTags(tags: Array<{ id?: number; name?: string }>): PetBuilder {
    this.pet.tags = tags;
    return this;
  }

  /**
   * Overrides the lifecycle status.
   * @param status Supported Petstore status value.
   */
  withStatus(status: "available" | "pending" | "sold"): PetBuilder {
    this.pet.status = status;
    return this;
  }

  /**
   * Returns an immutable copy of the current builder state.
   */
  build(): CreatePetRequest {
    return {
      ...this.pet,
      category: this.pet.category ? { ...this.pet.category } : undefined,
      photoUrls: [...this.pet.photoUrls],
      tags: this.pet.tags ? this.pet.tags.map((tag) => ({ ...tag })) : undefined
    };
  }
}
