import asyncHandler from "express-async-handler";
import { stripe } from "../lib/stripe.js";
import { createOrder, decreseStock, getCart } from "./service/orderService.js";
import Coupons from "../model/couponModel.js";
import Orders from "../model/orderModel.js";

export const createCheckOutSession = asyncHandler(async (req, res) => {
  const { couponCode, shippingAddress } = req.body;
  const cart = await getCart(req.user._id);

  if (!cart || cart.cartItems.length === 0) {
    res.status(400);
    throw new Error("Cart is empty");
  }

  // stripe line items
  const lineItems = cart.cartItems.map((item) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: item.product.name,
      },
      unit_amount: Math.round(item.product.price * 100),
    },
    quantity: item.quantity,
  }));

  // Calculate total
  const itemsPrice = cart.cartItems.reduce((acc, item) => {
    return acc + item.product.price * item.quantity;
  }, 0);

  let discount = 0;

  let coupon = null;

  if (couponCode) {
    coupon = await Coupons.findOne({
      code: couponCode.toUpperCase(),
      isActive: true,
    });

    if (!coupon) {
      res.status(404);
      throw new Error("Coupon not found");
    }

    if (coupon.expirationDate < new Date()) {
      res.status(400);
      throw new Error("Coupon expired");
    }

    discount = (itemsPrice * coupon.discountPercentage) / 100;
  }

  const totalAmount = itemsPrice - discount;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: `${process.env.CLIENT_URI}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.CLIENT_URI}/cancel`,
    metadata: {
      userId: req.user._id.toString(),
      couponCode: couponCode || "",
      shippingAddress: JSON.stringify(req.body.shippingAddress),
    },
  });
  res.status(200).json({
    sessionId: session.id,
    url: session.url,
    totalAmount,
  });
});

export const checkoutSuccess = asyncHandler(async (req, res) => {
  const { sessionId } = req.body;
  // console.log("1- sessionId:", sessionId);

  const session = await stripe.checkout.sessions.retrieve(sessionId);

  // console.log("2- payment:", session.payment_status);

  if (session.payment_status !== "paid") {
    res.status(400);
    throw new Error("Payment not completed");
  }

  const existingOrder = await Orders.findOne({
    stripeSessionId: session.id,
  });

  if (existingOrder) {
    return res.status(200).json({
      message: "Order already created",
      order: existingOrder,
    });
  }
  // console.log("3- creating order");
  const order = await createOrder({
    userId: session.metadata.userId,
    shippingAddress: JSON.parse(session.metadata.shippingAddress),
    couponCode: session.metadata.couponCode,
    paymentMethod: "Online",
    paymentStatus: "Paid",
    orderStatus: "Pending",
  });

  // console.log("4- order created:", order._id);
  await decreseStock(order.orderItems);
  // console.log("5- stock updated");
  res.status(201).json({
    message: "Payment Successful",
    order,
  });
});

// create order
export const cashPayment = asyncHandler(async (req, res) => {
  const { shippingAddress, couponCode } = req.body;

  //   console.log("before ordered:", order);

  const cart = await getCart(req.user._id);

  const order = await createOrder({
    userId: req.user._id,
    paymentMethod: "Cash",
    paymentStatus: "Pending",
    orderStatus: "Pending",
  });
  //   console.log("berfore ordered:", order.orderItems);
  await decreseStock(order.orderItems);
  //   console.log("after ordered:", order.orderItems);

  res.status(201).json({ message: "Created Order Successfully", order });
});
