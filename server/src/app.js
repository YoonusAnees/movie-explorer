import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { rateLimit } from "express-rate-limit";

import { environment } from "./config/environment.js";
import routes from "./routes/router.index.js";
import { checkMutation } from "./middleware/middleware.checkMutation.js";
import { errorHandler } from "./middleware/middleware.errorHandler.js";
import { isAllowedOrigin } from "./utils/allowedOrigins.js";

const app = express();

if (environment.TRUST_PROXY === "1" || environment.NODE_ENV === "production") {
    app.set("trust proxy", 1);
}

app.use(helmet());


app.use(
    cors({
        origin: (origin, callback) => {
            if (isAllowedOrigin(origin)) {
                return callback(null, origin || true);
            }
            return callback(new Error("CORS origin not allowed: " + origin), false);
        },
        credentials: true,
    })
);

app.use(express.json({ limit: "20kb" }));
app.use(cookieParser());
app.use(checkMutation);

app.use(
    "/api/v1",
    rateLimit({
        windowMs: 60 * 1000,
        limit: 120,
        standardHeaders: "draft-8",
        legacyHeaders: false,
        message: {
            success: false,
            message: "Too many requests. Please wait a minute.",
        },
    }),
    routes
);

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Endpoint not found.",
    });
});

app.use(errorHandler);

export default app;