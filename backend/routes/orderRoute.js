import express from "express";
import { adminAuth, protect } from "../middleware/authMiddleware.js";
import {
  cashPayment,
  checkoutSuccess,
  createCheckOutSession,
} from "../controller/paymentController.js";
import {
  getAllOrders,
  getOrderByUserId,
  updateOrderStatus,
} from "../controller/orderController.js";

const router = express.Router();

router.use(protect);

router.post("/cash", cashPayment);
router.post("/create-checkout", createCheckOutSession);
router.post("/checkout-success", checkoutSuccess);
router.get("/", getOrderByUserId);
// admin
router.patch("/:id/status", adminAuth, updateOrderStatus);
router.get("/my-order", adminAuth, getAllOrders);

export default router;
