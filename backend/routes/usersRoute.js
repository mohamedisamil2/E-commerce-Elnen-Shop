import express from "express";
import {
  authtoLoginUsers,
  getUserProfile,
  logoutUser,
  registerUser,
  updateUserProfile,
} from "../controller/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", registerUser);
router.post("/login", authtoLoginUsers);
router.post("/logout", logoutUser);
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);
router.get("/check", protect, (req, res) => res.status(200).json(req.user));

export default router;
