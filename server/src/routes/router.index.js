import { Router } from "express";

const router = Router();

router.get("/health", (req, res) => {
    res.json({
        success: true,
        message: "Movie Explorer API is running",
    });
});

export default router;