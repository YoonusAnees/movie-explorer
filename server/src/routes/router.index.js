import { Router } from "express";
import authRoutes from "./route.authRoutes.js";
import movieRoutes from "./router.movieRoutes.js";

const router = Router();

router.get("/health", (req, res) => {
    res.json({
        success: true,
        message: "Movie Explorer API is running",
    });
});

router.use("/auth", authRoutes);
router.use("/movies", movieRoutes);

export default router;