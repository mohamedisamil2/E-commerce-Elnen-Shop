import asyncHandler from "express-async-handler";
import Orders from "../model/orderModel.js";
import { restoreStock } from "./service/orderService.js";

// Update Order Status
const updateOrderStatus = asyncHandler(async (req, res) => {
  const { orderStatus } = req.body;

  const order = await Orders.findById(req.params.id);

  if (!order) {
    res.status(404);
    throw new Error("Order Not Found");
  }

  const currentStatus = order.orderStatus;
  const newStatus = req.body.orderStatus;

  switch (newStatus) {
    case "Processing":
      break;

    case "shipped":
      break;

    case "delivered":
      if (currentStatus !== "delivered") {
        order.deliveredAt = Date.now();
      }
      break;

    case "cancelled":
      if (currentStatus === "delivered") {
        throw new Error("Delivered order cannot be cancelled");
      }

      if (currentStatus !== "cancelled") {
        await restoreStock(order.orderItems);
      }
      break;

    default:
      throw new Error("Invalid order status");
  }
  order.orderStatus = orderStatus;

  await order.save();
  res.status(200).json({ message: "Order Status Updated Successfully", order });
});

// Get All Orders
const getAllOrders = asyncHandler(async (req, res) => {
  const order = await Orders.find({})
    .select("totalAmount paymentStatus orderStatus createdAt ")
    .populate("user", "name email")
    .sort({ createdAt: -1 });
  res.status(200).json({ message: "Get All Orders Successfully", order });
});

// Get Order By User Id
const getOrderByUserId = asyncHandler(async (req, res) => {
  const order = await Orders.find({ user: req.user._id }).sort("-createdAt");
  res.status(200).json({ message: "Get Order By UserId Successfully", order });
});

// Quantity deducted from stock after successful order
// خصم الكمية من المخزون بعد نجاح الطلب
const quantityDeductedFromStockAfterSuccessfullOrder = asyncHandler(
  async (req, res) => {
    res.status(200).json({
      message: "The quantity was successfully deducted from the inventory",
    });
  },
);

export {
  updateOrderStatus,
  getAllOrders,
  getOrderByUserId,
  quantityDeductedFromStockAfterSuccessfullOrder,
};
