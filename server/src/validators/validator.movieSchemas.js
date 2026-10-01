import { z } from "zod";

export const pageSchema = z.object({
    page: z.coerce
        .number()
        .int()
        .min(1)
        .max(500)
        .default(1),
});

export const searchSchema = pageSchema.extend({
    query: z.string().trim().min(1).max(200),

    year: z.coerce
        .number()
        .int()
        .min(1888)
        .max(2100)
        .optional(),
});

export const discoverSchema = pageSchema.extend({
    genre: z.coerce
        .number()
        .int()
        .positive()
        .optional(),

    year: z.coerce
        .number()
        .int()
        .min(1888)
        .max(2100)
        .optional(),

    rating: z.coerce
        .number()
        .min(0)
        .max(10)
        .optional(),
});

export const movieIdSchema = z.object({
    movieId: z.coerce.number().int().positive(),
});