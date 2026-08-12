import express from "express";
import {
  applyCoupon,
  createNewCoupon,
  getCoupon,
} from "../controller/couponController.js";
import { adminAuth, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);
router.post("/", adminAuth, createNewCoupon);
router.post("/apply", applyCoupon);
router.get("/", getCoupon);

export default router;
