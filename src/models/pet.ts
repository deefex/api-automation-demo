import { z } from "zod";

/**
 * Optional pet category metadata.
 */
export const categorySchema = z
  .object({
    id: z.number().optional(),
    name: z.string().optional()
  })
  .optional();

/**
 * Optional tag entry attached to a pet.
 */
export const tagSchema = z.object({
  id: z.number().optional(),
  name: z.string().optional()
});

/**
 * Supported Petstore status values.
 */
export const petStatusSchema = z.enum(["available", "pending", "sold"]);

/**
 * Pet response schema returned by Petstore endpoints.
 */
export const petSchema = z.object({
  id: z.number(),
  category: categorySchema,
  name: z.string(),
  photoUrls: z.array(z.string()),
  tags: z.array(tagSchema).optional(),
  status: petStatusSchema.optional()
});

/**
 * Pet request schema used for create/update operations.
 */
export const createPetRequestSchema = z.object({
  id: z.number(),
  category: categorySchema,
  name: z.string(),
  photoUrls: z.array(z.string()),
  tags: z.array(tagSchema).optional(),
  status: petStatusSchema.optional()
});

/**
 * Inferred TypeScript type for a validated Petstore pet response.
 */
export type Pet = z.infer<typeof petSchema>;
/**
 * Inferred TypeScript type for a validated pet create/update request.
 */
export type CreatePetRequest = z.infer<typeof createPetRequestSchema>;
