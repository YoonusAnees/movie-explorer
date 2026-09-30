import { Router } from "express";
import authRoutes from "./route.authRoutes.js";

const router = Router();

router.get("/health", (req, res) => {
    res.json({
        success: true,
        message: "Movie Explorer API is running",
    });
});

router.use("/auth", authRoutes);

export default router;