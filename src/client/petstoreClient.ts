import axios, { type AxiosInstance } from "axios";
import { config } from "../config/env.js";
import {
  createPetRequestSchema,
  petSchema,
  type CreatePetRequest,
  type Pet
} from "../models/pet.js";

export class PetstoreClient {
  private readonly client: AxiosInstance;

  constructor(baseUrl = config.petstoreBaseUrl) {
    this.client = axios.create({
      baseURL: baseUrl,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }

  async createPet(payload: CreatePetRequest): Promise<Pet> {
    const validatedPayload = createPetRequestSchema.parse(payload);
    const response = await this.client.post("/pet", validatedPayload);
    return petSchema.parse(response.data);
  }

  async getPetById(petId: number): Promise<Pet> {
    const response = await this.client.get(`/pet/${petId}`);
    return petSchema.parse(response.data);
  }

  async deletePet(petId: number): Promise<void> {
    await this.client.delete(`/pet/${petId}`);
  }
}
