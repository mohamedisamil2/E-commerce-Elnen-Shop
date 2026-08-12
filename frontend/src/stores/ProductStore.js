import { create } from "zustand";
import { api } from "../lib/axios";
import toast from "react-hot-toast";

export const adminProductStore = create((set) => ({
  products: [],
  isLoading: false,
  isCreating: false,
  isUpdating: false,
  isDeleting: false,
  isLoadingDelete: false,

  // ==========================
  // Get All Products for users
  // ==========================

  getProducts: async () => {
    try {
      const res = await api.get("/product/products");
      set({ products: res.data });
    } catch (err) {
      showError(err);
    }
  },

  // ==========================
  // Get All Products for Admin
  // ==========================
  getAdminProducts: async () => {
    try {
      const res = await api.get("/product");
      set({ products: res.data });
    } catch (err) {
      showError(err);
    }
  },

  // ==========================
  // Create Product
  // ==========================
  createProduct: async (productData) => {
    set({ isCreating: true });
    try {
      const res = await api.post("/product", productData);
      set((state) => ({
        products: [...state.products, res.data],
      }));
      toast.success("Product Created Successfully");
    } catch (err) {
      showError(err);
    } finally {
      set({ isCreating: false });
    }
  },

  // ==========================
  // Update Product
  // ==========================

  //   updateProduct: async (id, productData) => {},

  // ==========================
  // Delete Product
  // ==========================

  deleteProduct: async (id) => {
    set({ isDeleting: true });
    try {
      await api.delete(`/product/delete/${id}`);
      set((state) => ({
        products: state.products.filter((product) => product._id !== id),
      }));
      toast.success("Deleted Product Successfully");
    } catch (err) {
      showError(err);
    } finally {
      set({ isDeleting: false });
    }
  },

  // ==========================
  // Toggle Featured
  // ==========================

  toggleFeatured: async (id) => {
    try {
      const res = await api.patch(`/product/${id}`);
      set((state) => ({
        products: state.products.map((product) =>
          product._id === id
            ? { ...product, isFeatured: res.data.isFeatured }
            : product,
        ),
      }));
      // set({ products: res.data });
      console.log(res.data.isFeatured);
      toast.success("Updated featured Product Successfully");
    } catch (err) {
      showError(err);
    }
  },
}));
// Handle Error
const showError = (err) =>
  toast.error(err.response?.data?.message || "Something went wrong");
