import { create } from "zustand";
import { api } from "../lib/axios";
import toast from "react-hot-toast";

export const orderStore = create((set, get) => ({
  order: [],
  isCashPaymentLoading: false,
  isCheckoutLoading: false,
  isCheckoutSuccessLoading: false,
  isOrderLoading: false,
  isLoadingStatus: false,

  createOrdercash: async (shippingAddress) => {
    set({ isCashPaymentLoading: true });
    try {
      const res = await api.post("/order/cash", { shippingAddress });
      set({ order: res.data });
      toast.success("Payment Cash By Successfully");
    } catch (err) {
      showError(err);
    } finally {
      set({ isCashPaymentLoading: false });
    }
  },
  createStripeCheckout: async (shippingAddress) => {
    set({ isCheckoutLoading: true });
    try {
      const res = await api.post("/order/create-checkout", {
        shippingAddress,
      });
      return res.data;
    } catch (err) {
      showError(err);
    } finally {
      set({ isCheckoutLoading: false });
    }
  },
  confirmStripePayment: async (sessionId) => {
    set({ isCheckoutSuccessLoading: true });
    try {
      const res = await api.post("/order/checkout-success ", { sessionId });
      set({ order: res.data });
      toast.success("Payment Done Successfully");
    } catch (err) {
      showError(err);
    } finally {
      set({ isCheckoutSuccessLoading: true });
    }
  },
  showMyOrder: async () => {
    set({ isOrderLoading: true });
    try {
      const res = await api.get("/order");
      set({ order: res.data.order });
    } catch (err) {
      showError(err);
    } finally {
      set({ isOrderLoading: false });
    }
  },
  // for admin
  allMyOrder: async () => {
    set({ isOrderLoading: true });
    try {
      const res = await api.get("/order/my-order");
      set({ order: res.data.order });
    } catch (err) {
      showError(err);
    } finally {
      set({ isOrderLoading: false });
    }
  },
  updateStatusOfOrder: async (orderStatus, id) => {
    set({ isLoadingStatus: true });
    try {
      await api.patch(`/order/${id}/status`, { orderStatus });
      console.log(orderStatus);
      toast.success("Order updated successfully");
      await get().allMyOrder(); // fetch my order
    } catch (err) {
      showError(err);
    } finally {
      set({ isLoadingStatus: false });
    }
  },
}));

// Handle Error
const showError = (err) => {
  toast.error(err.response?.data?.message || "somethin went wrong");
};
