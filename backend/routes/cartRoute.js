import express from "express";
import {
  addToCart,
  clearAllProductFromCart,
  deleteProductFromCart,
  getCartProduct,
  updateQuantityInCart,
} from "../controller/cartsController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);
router.post("/", addToCart);
router.get("/", getCartProduct);
router.patch("/quantity", updateQuantityInCart);
router.delete("/delete", deleteProductFromCart);
router.delete("/clear", clearAllProductFromCart);

export default router;
