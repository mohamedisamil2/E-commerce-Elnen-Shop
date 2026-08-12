import { create } from "zustand";
import { api } from "../lib/axios";
import toast from "react-hot-toast";

export const couponStore = create((set) => ({
  coupons: [],
  isCreateCoupons: false,
  isLoaingCoupons: false,

  createCoupon: async (data) => {
    set({ isCreateCoupons: true, isLoaingCoupons: true });
    try {
      const res = await api.post("/coupon", data);
      console.log("Created Coupon:", res.data);

      set((state) => ({
        coupons: [...state.coupons, res.data],
      }));

      toast.success("Created Coupon Successfully");

      return res.data;
    } catch (error) {
      toast.error(error?.response?.data?.messsage || "something went wrong");
    } finally {
      set({ isCreateCoupons: false, isLoaingCoupons: false });
    }
  },
}));
