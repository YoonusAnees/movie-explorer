import { environment } from "../config/environment.js";
import { AppError } from "../utils/AppError.js";

export function checkMutation(req, res, next) {
    if (["GET", "HEAD", "OPTIONS"].includes(req.method)) {
        return next();
    }

    if (req.get("X-Requested-With") !== "MovieExplorer") {
        return next(new AppError("Invalid request header.", 403));
    }

    const origin = req.get("Origin");
    const allowedOrigin = new URL(environment.CLIENT_URL).origin;

    if (origin && origin !== allowedOrigin) {
        return next(
            new AppError("Request origin is not allowed.", 403)
        );
    }

    next();
}