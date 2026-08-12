import asyncHandler from "express-async-handler";
import Carts from "../../model/cartModel.js";
import Coupons from "../../model/couponModel.js";
import Orders from "../../model/orderModel.js";
import Products from "../../model/productModel.js";

// Create new order
export const createOrder = async ({
  userId,
  couponCode,
  shippingAddress,
  paymentMethod,
  paymentStatus,
  orderStatus,
}) => {
  const cart = await Carts.findOne({ user: userId }).populate(
    "cartItems.product",
  );

  if (!cart || cart.cartItems.length === 0) {
    throw new Error("Cart is Empty");
  }

  console.log(cart.cartItems);
  // Calculate product Total
  const itemsPrice = cart.cartItems.reduce((acc, item) => {
    return acc + item.product.price * item.quantity;
  }, 0);

  // Calaculate Coupon discount
  let discount = 0;
  let coupon = null;

  if (couponCode) {
    coupon = await Coupons.findOne({
      code: couponCode.toUpperCase(),
      isActive: true,
    });
    if (!coupon) {
      throw new Error("Coupon not found");
    }
    discount = (itemsPrice * coupon.discountPercentage) / 100;
  }

  // Calculate the final price
  const totalAmount = itemsPrice - discount;

  console.log({
    itemsPrice,
    discount,
    totalAmount,
  });

  // create new order
  const order = await Orders.create({
    user: userId,
    orderItems: cart.cartItems,
    itemsPrice,
    discount,
    totalAmount,
    paymentStatus,
    paymentMethod,
    orderStatus,
    shippingAddress,
    coupon: coupon ? coupon._id : null,
  });
  cart.cartItems = [];
  await cart.save();

  return order;
};

// get order
export const getCart = async (userId) => {
  const cart = await Carts.findOne({
    user: userId,
  }).populate("cartItems.product");

  return cart;
};

// Check the inventory

// Decrease the inventory if client odered completed
export const decreseStock = async (cartItems) => {
  for (const item of cartItems) {
    const update = await Products.findByIdAndUpdate(item.product._id, {
      $inc: {
        countInStock: -item.quantity,
      },
    });
  }
};
// Restore Stock if client Cancelled Order
export const restoreStock = async (orderItems) => {
  for (const item of orderItems) {
    await Products.findByIdAndUpdate(item.product._id, {
      $inc: {
        countInStock: item.quantity,
      },
    });
  }
};

// // Cancelled Orders
// const cancelOrder = asyncHandler(async (req, res) => {

//   res.status(200).json({ message: "Cancelled Order Successfully" });
// });
