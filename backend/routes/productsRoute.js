import express from "express";
import {
  createNewProducts,
  deleteProducts,
  getAllProduct,
  getAllProducts,
  getFeaturedProducts,
  getProductsByCategory,
  getProductsByKeywordSearch,
  getRecommendationProducts,
  toggleFeaturedProduct,
  updatePartOfProducts,
} from "../controller/productsController.js";
import { adminAuth, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, adminAuth, getAllProducts);
router.get("/products", protect, getAllProduct);
router.get("/featured", getFeaturedProducts);
router.get("/recommend", getRecommendationProducts);
router.get("/search", getProductsByKeywordSearch);
router.get("/category/:category", getProductsByCategory);
router.patch("/:id", protect, adminAuth, toggleFeaturedProduct);
router.patch("/:id", protect, adminAuth, updatePartOfProducts);
router.post("/", protect, adminAuth, createNewProducts);
router.delete("/delete/:id", protect, adminAuth, deleteProducts);

export default router;
