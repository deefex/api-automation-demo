import { z } from "zod";

export const categorySchema = z
  .object({
    id: z.number().optional(),
    name: z.string().optional()
  })
  .optional();

export const tagSchema = z.object({
  id: z.number().optional(),
  name: z.string().optional()
});

export const petStatusSchema = z.enum(["available", "pending", "sold"]);

export const petSchema = z.object({
  id: z.number(),
  category: categorySchema,
  name: z.string(),
  photoUrls: z.array(z.string()),
  tags: z.array(tagSchema).optional(),
  status: petStatusSchema.optional()
});

export const createPetRequestSchema = z.object({
  id: z.number(),
  category: categorySchema,
  name: z.string(),
  photoUrls: z.array(z.string()),
  tags: z.array(tagSchema).optional(),
  status: petStatusSchema.optional()
});

export type Pet = z.infer<typeof petSchema>;
export type CreatePetRequest = z.infer<typeof createPetRequestSchema>;
