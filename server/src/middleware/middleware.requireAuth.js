import jwt from "jsonwebtoken";

import User from "../models/model.user.js";
import { environment } from "../config/environment.js";
import { AppError } from "../utils/AppError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const requireAuth = asyncHandler(
    async (req, res, next) => {
        const token = req.cookies.movie_session;

        if (!token) {
            throw new AppError(
                "Please sign in to continue.",
                401
            );
        }

        let payload;

        try {
            payload = jwt.verify(
                token,
                environment.JWT_SECRET,
                {
                    algorithms: ["HS256"],
                    issuer: "movie-explorer",
                    audience: "movie-explorer-client",
                }
            );
        } catch {
            throw new AppError(
                "Your session expired. Please sign in again.",
                401
            );
        }

        const user = await User.findById(payload.sub);

        if (!user) {
            throw new AppError("Please sign in again.", 401);
        }

        req.user = user;
        next();
    }
);