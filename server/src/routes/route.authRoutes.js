import { Router } from "express";
import { rateLimit } from "express-rate-limit";

import * as controller from "../controllers/controller.authController.js";
import { credentialsSchema } from "../validators/validator.authSchemas.js";
import { validateRequest } from "../middleware/middleware.validateRequest.js";
import { requireAuth } from "../middleware/middleware.requireAuth.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = Router();

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 20,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    message: {
        success: false,
        message: "Too many attempts. Try again in 15 minutes.",
    },
});

router.post(
    "/register",
    limiter,
    validateRequest(credentialsSchema),
    asyncHandler(controller.register)
);

router.post(
    "/login",
    limiter,
    validateRequest(credentialsSchema),
    asyncHandler(controller.login)
);

router.post("/logout", controller.logout);
router.get("/me", requireAuth, controller.me);

export default router;