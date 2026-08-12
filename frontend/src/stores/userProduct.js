import { create } from "zustand";
import { api } from "../lib/axios";
import toast from "react-hot-toast";

export const userProductStore = create((set) => ({
  product: [],
  isLoading: false,
  isAddToCart: false,

  // Get Featured
  getFeatured: async () => {
    set({ isLoading: true });
    try {
      const res = await api.get("/product/featured");
      set({ product: res.data });
    } catch (err) {
      showError(err);
    } finally {
      set({ isLoading: false });
    }
  },

  // Get Featured
  getRecommend: async () => {
    try {
      const res = await api.get("/product/recommend");
      set({ product: res.data });
    } catch (err) {
      showError(err);
    }
  },

  // Get All Product
  getProduct: async () => {
    set({ isLoading: true });
    try {
      const res = await api.get("/product/products");
      set({ product: res.data });
    } catch (err) {
      showError(err);
    } finally {
      set({ isLoading: false });
    }
  },

  getCategoryByCategory: async (category) => {
    set({ isLoading: true });
    try {
      const res = await api.get(
        `/product/category/${encodeURIComponent(category)}`,
      );
      console.log("CATEGORY RESPONSE:", res.data);
      set({ product: res.data });
    } catch (err) {
      showError(err);
    } finally {
      set({ isLoading: false });
    }
  },
}));

// Handle Error
const showError = (err) =>
  toast.error(err.response?.data?.message || "Something went wrong");
