import { environment } from "../config/environment.js";

function parseOrigin(urlStr) {
    if (!urlStr) return "";
    try {
        return new URL(urlStr.trim()).origin;
    } catch {
        return urlStr.trim();
    }
}

const rawOrigins = [
    environment.CLIENT_URL,
    ...(environment.ALLOWED_ORIGINS
        ? environment.ALLOWED_ORIGINS.split(",")
        : []),
];

export const allowedOrigins = Array.from(
    new Set(rawOrigins.map(parseOrigin).filter(Boolean))
);

export function isAllowedOrigin(origin) {
    if (!origin) return true;

    // Explicitly listed origins (from CLIENT_URL + ALLOWED_ORIGINS env vars)
    if (allowedOrigins.includes(origin)) return true;

    // Always allow localhost for convenience
    if (origin === "http://localhost:3000" || origin === "http://127.0.0.1:3000") return true;

    // Allow any Vercel deployment/preview URL
    if (origin.endsWith(".vercel.app")) {
        return true;
    }

    if (environment.NODE_ENV !== "production") {
        // Allow any local network IP in dev
        if (
            /^https?:\/\/(localhost|127\.0\.0\.1|192\.168\.\d+\.\d+|10\.\d+\.\d+\.\d+|172\.(1[6-9]|2\d|3[0-1])\.\d+\.\d+)(:\d+)?$/.test(
                origin
            )
        ) {
            return true;
        }
    }

    return false;
}
