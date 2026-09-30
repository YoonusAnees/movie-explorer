import { z } from "zod";

const username = z
    .string()
    .trim()
    .toLowerCase()
    .min(3)
    .max(30)
    .regex(
        /^[a-z0-9_]+$/,
        "Use letters, numbers and underscores only."
    );

const password = z
    .string()
    .min(8, "Use at least 8 characters.")
    .max(64, "Use no more than 64 characters.")
    .refine(
        (value) => Buffer.byteLength(value, "utf8") <= 72,
        "Password must fit within 72 UTF-8 bytes."
    );

export const credentialsSchema = z
    .object({
        username,
        password,
    })
    .strict();

const passwordRepeat = z.string().refine((v) => v === password.parse(v), {
    message: "Passwords do not match.",
});

export const registrationSchema = z
    .object({
        username,
        password,
        passwordRepeat,
    })
    .strict();