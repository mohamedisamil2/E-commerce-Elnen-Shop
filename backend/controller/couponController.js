import asyncHandler from "express-async-handler";
import Coupons from "../model/couponModel.js";

// Create Coupon
const createNewCoupon = asyncHandler(async (req, res) => {
  const { code, discountPercentage, expiresInHours } = req.body;

  const expirationDate = new Date(Date.now() + expiresInHours * 60 * 60 * 1000);

  if (!code || discountPercentage == null || !expirationDate) {
    res.status(400);
    throw new Error("Please fill all required field");
  }

  // Search of the Coupon
  const existCoupon = await Coupons.findOne({ code: code.toUpperCase() });

  if (existCoupon) {
    res.status(400);
    throw new Error("Coupon already exist");
  }

  // create coupon
  const coupon = await Coupons.create({
    code: code.toUpperCase(),
    discountPercentage,
    expirationDate,
    createdBy: req.user._id,
  });

  res.status(201).json(coupon);
});

// Get Coupon I'll using in the future inshalah
const getCoupon = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "You Successfully obtained the Coupon" });
});

// Validate or Apply Coupon
const applyCoupon = asyncHandler(async (req, res) => {
  const { code } = req.body;
  const coupon = await Coupons.findOne({
    code: code.toUpperCase(),
    isActive: true,
  });

  if (!coupon) {
    res.status(404);
    throw new Error("Coupon Not Found");
  }

  if (coupon.expirationDate < new Date()) {
    res.status(404);
    throw new Error("Coupon is Expiration");
  }

  //   await coupon.save();
  res.status(200).json({
    message: "coupon is a valid",
    code: coupon.code.toUpperCase(),
    discountPercentage: coupon.discountPercentage,
  });
});

export { createNewCoupon, getCoupon, applyCoupon };
