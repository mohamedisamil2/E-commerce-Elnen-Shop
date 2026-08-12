import express from "express";
import { getAnalytics } from "../controller/analyticsController.js";
import { adminAuth, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect, adminAuth);
router.get("/", getAnalytics);

export default router;
