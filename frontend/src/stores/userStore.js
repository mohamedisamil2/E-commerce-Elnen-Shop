import { create } from "zustand";
import toast from "react-hot-toast";
import { api } from "../lib/axios";

// const BASE_URL =
//   import.meta.env.MODE === "development" ? "http://localhost:5000" : "/";

export const userStore = create((set) => ({
  auth: null,
  isSignIn: false,
  isSignUp: false,
  isChecking: true,

  checkAuth: async () => {
    try {
      const res = await api.get("/user/check");
      set({ auth: res.data });
    } catch (error) {
      console.log("Error in checkAuth:", error);
      set({ auth: null });
    } finally {
      set({ isChecking: false });
    }
  },
  // checkAuth: async () => {
  //   console.log("1 - checkAuth started");

  //   try {
  //     const res = await fetch("http://localhost:5000/api/user/check", {
  //       credentials: "include",
  //     });

  //     console.log("status:", res.status);

  //     const data = await res.json();

  //     console.log(data);
  //     // const res = await api.get("/user/check");

  //     console.log("2 - response", res.data);

  //     set({ auth: res.data });
  //   } catch (error) {
  //     console.log("3 - error", error);

  //     set({ auth: null });
  //   } finally {
  //     console.log("4 - finally");

  //     set({ isChecking: false });
  //   }
  // },

  signUp: async (data) => {
    set({ isSignUp: true });
    try {
      const res = await api.post("/user", data);
      set({ auth: res.data });
      toast.success("User Created Successfully");
    } catch (err) {
      toast.error(err.response?.data?.message);
      set({ auth: null });
    } finally {
      set({ isSignUp: false });
    }
  },

  login: async (data) => {
    set({ isSignIn: true });
    try {
      const res = await api.post("/user/login", data);
      console.log("Response:", res.data);
      set({ auth: res.data });
      console.log("After set:", userStore.getState().auth);
      toast.success("User LoggedIn Successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Network Error");
      set({ auth: null });
    } finally {
      set({ isSignIn: false });
    }
  },

  logOut: async () => {
    try {
      await api.post("/user/logout");
      set({ auth: null });
      toast.success("User Logged out Successfully");
    } catch (error) {
      toast.error(error.response?.data?.message);
      console.log("Logout error:", error);
    }
  },

  getProfile: async () => {
    try {
      await api.get("/user/profile");
      set({ auth: null });
      toast.success("User get Profile Successfully");
    } catch (error) {
      toast.error("Error get Profile ");
      console.log("get Profile error:", error);
    }
  },
}));
