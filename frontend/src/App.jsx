import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Order from "./pages/Order";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import IsLoading from "./components/isLoading";
import { useEffect } from "react";
import { userStore } from "./stores/userStore";
import AdminDashboard from "./pages/AdminDashboard";
import { cartStore } from "./stores/cartStore";
import CreateProducts from "./pages/CreateProducts";
import EditProduct from "./pages/EditProduct";
import Analytics from "./pages/Analytics";
import Coupons from "./pages/Coupons";
import AllOrder from "./pages/AllOrder";
import ProductAdmin from "./pages/ProductAdmin";
import ProductUser from "./pages/ProductUser";
import Category from "./pages/Category";
import Checkout from "./pages/Checkout";
import PaymentSucess from "./pages/paymentSucess";

function App() {
  const { checkAuth, isChecking, auth } = userStore();
  const { getCart } = cartStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (auth?._id) {
      getCart();
    }
  }, [auth?._id, getCart]);

  console.log({ auth });

  if (isChecking) return <IsLoading />;
  return (
    <div className=" min-h-screen bg-white relative overflow-hidden">
      <Toaster />
      <div
        className="absolute inset-0 bg-[linear-gradient(ellipse_at_top,#4f4f4f2e_1px,transparent_1px),linear-gradient
      (to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-size[14px_24px]"
      />
      <div className="absolute top-40 -left-10 size-96 bg-pink-500 opacity-20 blur-[100px]" />
      <div className="absolute bottom-0 -right-4 size-96 bg-green-500 opacity-20 blur-[100px]" />
      <div>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              auth?.role !== "admin" ? <Home /> : <Navigate to="/admin" />
            }
          />
          <Route
            path="/login"
            element={auth ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/register"
            element={auth ? <Navigate to="/" /> : <Register />}
          />

          <Route
            path="/admin"
            element={
              auth?.role === "admin" ? (
                <AdminDashboard />
              ) : (
                <Navigate to="/" replace />
              )
            }
          >
            <Route index element={<Analytics />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="products" element={<ProductAdmin />} />

            <Route path="products/create" element={<CreateProducts />} />

            <Route path="products/edit/:id" element={<EditProduct />} />

            <Route path="order" element={<AllOrder />} />

            <Route path="coupons" element={<Coupons />} />
          </Route>
          <Route
            path="/cart"
            element={auth ? <Cart /> : <Navigate to="/login" />}
          />

          <Route path="/product/user" element={<ProductUser />} />
          <Route
            path="/checkout"
            element={auth ? <Checkout /> : <Navigate to="/login" />}
          />
          <Route path="/success" element={<PaymentSucess />} />
          <Route
            path="/order"
            element={auth ? <Order /> : <Navigate to="/login" />}
          />
          <Route
            path="/category/:category"
            element={auth ? <Category /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
