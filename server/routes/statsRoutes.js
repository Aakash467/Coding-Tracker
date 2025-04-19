import express from "express";
import { getCodingStats } from "../controllers/statsControllers.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// Route to fetch coding stats for the logged-in user
router.get("/",authMiddleware, getCodingStats);

export default router;