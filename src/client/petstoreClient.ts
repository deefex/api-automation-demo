import axios, { type AxiosInstance } from "axios";
import { config } from "../config/env.js";
import {
  createPetRequestSchema,
  petSchema,
  type CreatePetRequest,
  type Pet
} from "../models/pet.js";

/**
 * Thin API client for Swagger Petstore pet endpoints.
 * Validates request and response payloads with Zod schemas.
 */
export class PetstoreClient {
  private readonly client: AxiosInstance;

  /**
   * @param baseUrl Base URL for the Petstore API.
   */
  constructor(baseUrl = config.petstoreBaseUrl) {
    this.client = axios.create({
      baseURL: baseUrl,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }

  /**
   * Creates or updates a pet record.
   * @param payload Pet request payload.
   * @returns Parsed pet response body.
   * @throws ZodError when the request or response schema is invalid.
   * @throws AxiosError when the API call fails.
   */
  async createPet(payload: CreatePetRequest): Promise<Pet> {
    const validatedPayload = createPetRequestSchema.parse(payload);
    const response = await this.client.post("/pet", validatedPayload);
    return petSchema.parse(response.data);
  }

  /**
   * Fetches a pet by id.
   * @param petId Pet identifier.
   * @returns Parsed pet response body.
   * @throws ZodError when the response schema is invalid.
   * @throws AxiosError when the API call fails.
   */
  async getPetById(petId: number): Promise<Pet> {
    const response = await this.client.get(`/pet/${petId}`);
    return petSchema.parse(response.data);
  }

  /**
   * Deletes a pet by id.
   * @param petId Pet identifier.
   * @returns Resolves when deletion request completes.
   * @throws AxiosError when the API call fails.
   */
  async deletePet(petId: number): Promise<void> {
    await this.client.delete(`/pet/${petId}`);
  }
}
