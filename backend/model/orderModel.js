import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    orderItems: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Products",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        price: {
          type: Number,
        },
      },
    ],

    itemsPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    discount: {
      type: Number,
      default: 0,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ["Cash", "Online"],
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Refund"],
      default: "Pending",
    },

    // حالة الطلب
    orderStatus: {
      type: String,
      enum: ["Pending", "Processing", "shipped", "delivered", "cancelled"],
      default: "Pending",
    },
    // الكوبون المستخدم
    coupon: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Coupons",
      default: null,
    },

    // عنوان الشحن
    shippingAddress: {
      fullName: String,
      phone: String,
      city: String,
      street: String,
      postalCode: String,
    },
    // تاريخ الدفع
    paidAt: Date,

    // تاريخ التسليم
    deliveredAt: Date,
  },
  { timestamps: true },
);

const Orders = mongoose.model("Orders", orderSchema);

export default Orders;
