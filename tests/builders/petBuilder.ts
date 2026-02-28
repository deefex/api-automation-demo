import type { CreatePetRequest } from "../../src/models/pet.js";

let sequence = 0;

function nextPetId(): number {
  sequence += 1;
  return Date.now() + sequence;
}

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

  withId(id: number): PetBuilder {
    this.pet.id = id;
    return this;
  }

  withName(name: string): PetBuilder {
    this.pet.name = name;
    return this;
  }

  withCategory(id: number, name: string): PetBuilder {
    this.pet.category = { id, name };
    return this;
  }

  withPhotoUrls(photoUrls: string[]): PetBuilder {
    this.pet.photoUrls = photoUrls;
    return this;
  }

  withTags(tags: Array<{ id?: number; name?: string }>): PetBuilder {
    this.pet.tags = tags;
    return this;
  }

  withStatus(status: "available" | "pending" | "sold"): PetBuilder {
    this.pet.status = status;
    return this;
  }

  build(): CreatePetRequest {
    return {
      ...this.pet,
      category: this.pet.category ? { ...this.pet.category } : undefined,
      photoUrls: [...this.pet.photoUrls],
      tags: this.pet.tags ? this.pet.tags.map((tag) => ({ ...tag })) : undefined
    };
  }
}

