import { create } from "zustand";
import { api } from "../lib/axios";
import toast from "react-hot-toast";

export const analyticStore = create((set) => ({
  analytics: null,
  dailySales: [],
  isLoadingAnalytics: false,

  showAnalytics: async () => {
    set({ isLoadingAnalytics: true });
    try {
      const res = await api.get("/analytic");
      set({ analytics: res.data.analyticData });
      set({ dailySales: res.data.getdailySales });
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
      console.log(error);
    } finally {
      set({ isLoadingAnalytics: false });
    }
  },
}));
