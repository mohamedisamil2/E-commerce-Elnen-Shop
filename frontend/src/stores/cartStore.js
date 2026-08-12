import { create } from "zustand";
import { api } from "../lib/axios";
import toast from "react-hot-toast";

export const cartStore = create((set, get) => ({
  cart: [],
  coupon: null,
  isAddCart: false,
  isGetCart: false,
  isUpdateCart: false,
  isCartOpen: true,
  isDeleteCart: false,
  isClearCart: false,
  isLoadingCart: false,
  total: 0,
  subTotal: 0,
  totalItems: 0,
  isCouponApplied: false,

  openCart: () => set({ isCartOpen: true }),
  closeCart: () => set({ isCartOpen: false }),

  toggleCart: () =>
    set((state) => ({
      isCartOpen: !state.isCartOpen,
    })),

  // ===========================
  // Calculate Cart Totals
  // ===========================
  calculateTotals: () => {
    const { cart, coupon } = get();
    const subTotal = cart.reduce((acc, item) => {
      return acc + item.product.price * item.quantity;
    }, 0);

    // const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    let total = subTotal;

    const discount = coupon?.discountAmount || 0;

    // إذا كان عندك خصم
    if (coupon) {
      total = subTotal - discount;
      //   total = subTotal - coupon.discountAmount;
    }

    set({
      subTotal,
      total,
      //   cartItemsCount,
      totalItems,
    });
  },

  // Get My Coupon
  getMyCoupon: async () => {
    try {
      const res = await api.get("/coupon");
      set({ coupon: res.data });
    } catch (err) {
      showError(err);
    }
  },

  // Apply Coupon
  applyCoupon: async (code) => {
    try {
      const res = await api.post("/coupon/apply", { code });

      set({ coupon: res.data, isCouponApplied: true });
      toast.success("Coupon Applied Successfully");
    } catch (err) {
      showError(err);
    }
  },

  // Add to Cart
  addToCart: async (product) => {
    set({ isAddCart: true, isLoadingCart: true });

    try {
      const res = await api.post("/cart", { productId: product._id });
      set({ cart: res.data.cartItems });
      get().calculateTotals();
      toast.success("Added To Cart Successfully");
    } catch (err) {
      showError(err);
    } finally {
      set({ isAddCart: false, isLoadingCart: false });
    }
  },

  // Get Cart
  getCart: async () => {
    set({ isGetCart: true, isLoadingCart: true });

    try {
      const res = await api.get("/cart");
      set({ cart: res.data });
      // console.log(res.data);
      // console.log(Array.isArray(res.data));
      get().calculateTotals();
    } catch (err) {
      set({ cart: [] });
      showError(err);
    } finally {
      set({ isGetCart: false, isLoadingCart: false });
    }
  },

  // Update Quantity In Cart
  updateQuantity: async (productId, quantity) => {
    set({ isUpdateCart: true });
    try {
      const res = await api.patch("/cart/quantity", { productId, quantity });
      console.log(res.data);
      set({ cart: res.data });
      get().calculateTotals();
    } catch (err) {
      showError(err);
    } finally {
      set({ isUpdateCart: false });
    }
  },

  // Delete Product From Cart
  deleteProductFromCart: async (productId) => {
    set({ isDeleteCart: true });

    try {
      const res = await api.delete("/cart/delete", {
        data: {
          productId,
        },
      });
      set({ cart: res.data });
      get().calculateTotals();
      toast.success("Deleted Product Successfully");
    } catch (err) {
      showError(err);
    } finally {
      set({ isDeleteCart: false });
    }
  },

  // Clear Product from Cart
  clearProduct: async () => {
    set({ isClearCart: true });

    try {
      await api.delete("/cart/clear");
      set({ cart: [] });
      get().calculateTotals();
      toast.success("Cleared All Items Successfully");
    } catch (err) {
      showError(err);
    } finally {
      set({ isClearCart: false });
    }
  },
}));

// Handle Error
const showError = (err) => {
  toast.error(err.response?.data?.message || "Something went wrong");
};
