import { Router } from "express";

import * as controller from "../controllers/controller.movieController.js";

import {
    pageSchema,
    searchSchema,
    discoverSchema,
    movieIdSchema,
} from "../validators/validator.movieSchemas.js";

import { validateRequest } from "../middleware/middleware.validateRequest.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = Router();

router.get(
    "/trending",
    validateRequest(pageSchema, "query"),
    asyncHandler(controller.trending)
);

router.get(
    "/search",
    validateRequest(searchSchema, "query"),
    asyncHandler(controller.search)
);

router.get(
    "/discover",
    validateRequest(discoverSchema, "query"),
    asyncHandler(controller.discover)
);

router.get(
    "/genres",
    asyncHandler(controller.genres)
);

router.get(
    "/:movieId",
    validateRequest(movieIdSchema, "params"),
    asyncHandler(controller.details)
);

export default router;