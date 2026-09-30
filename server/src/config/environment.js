import "dotenv/config";
import { z } from "zod";

const schema = z.object({
    NODE_ENV: z
        .enum(["development", "test", "production"])
        .default("development"),

    PORT: z.coerce
        .number()
        .int()
        .min(1)
        .max(65535)
        .default(5000),

    CLIENT_URL: z
        .string()
        .url()
        .default("http://localhost:3000"),

    MONGODB_URI: z.string().min(1),
    JWT_SECRET: z.string().min(32),
    TMDB_ACCESS_TOKEN: z.string().min(1),
    TRUST_PROXY: z.enum(["0", "1"]).default("0"),
});

const parsed = schema.safeParse(process.env);

if (!parsed.success) {
    const fields = parsed.error.issues
        .map((issue) => issue.path.join("."))
        .join(", ");

    throw new Error(`Invalid environment: ${fields}`);
}

export const environment = parsed.data;