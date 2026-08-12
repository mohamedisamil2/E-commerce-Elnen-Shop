import { motion } from "framer-motion";
import CartItems from "../components/CartItems";
import CouponCard from "../components/CouponCard";
import EmptyCart from "../components/EmptyCart";
import SkeletonLoadingCart from "../components/SkeletonLoadingCart";
import { cartStore } from "../stores/cartStore";
import { Link } from "react-router-dom";

function Cart() {
  const {
    cart,
    subTotal,
    total,
    coupon,
    totalItems,
    isLoadingCart,
    clearProduct,
  } = cartStore();

  // const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-50 py-10 mt-20 relative z-99999"
    >
      <div className="container mx-auto px-4">
        {isLoadingCart ? (
          <SkeletonLoadingCart />
        ) : cart.length === 0 ? (
          <EmptyCart />
        ) : (
          <>
            {/* Page Title */}
            <div className="mb-8">
              <h1 className="text-xl md:text-3xl w-fit px-4 py-2 font-semibold bg-linear-to-r from-green-500 via-green-900 to-green-300 rounded-bl-full rounded-tr-full">
                Shopping Cart
              </h1>

              <p className="text-gray-500 mt-1">
                You have {totalItems} items in your cart
              </p>
            </div>

            {/* Cart + Summary */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              {/* ================= CART ITEMS ================= */}
              <section className="lg:col-span-2">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-gray-800">
                      Your Items
                    </h2>

                    <span className="text-sm text-gray-500">
                      {totalItems} items
                    </span>
                  </div>

                  <div className="space-y-4">
                    {cart.map((item) => (
                      <CartItems key={item._id} item={item} />
                    ))}
                  </div>
                </div>
              </section>

              {/* ================= ORDER SUMMARY ================= */}
              <aside className="lg:col-span-1">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
                  <h2 className="text-xl font-bold text-gray-800 mb-6">
                    Order Summary
                  </h2>

                  {/* Items */}
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Items</span>

                      <span className="font-semibold text-gray-800">
                        {totalItems}
                      </span>
                    </div>

                    {/* Subtotal */}
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Subtotal</span>

                      <span className="font-semibold text-gray-800">
                        ${subTotal}
                      </span>
                    </div>

                    {/* Discount */}
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Discount</span>

                      <span className="font-semibold text-emerald-600">
                        -${coupon?.discountAmount || 0}
                      </span>
                    </div>

                    {/* Shipping */}
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Shipping</span>

                      <span className="font-semibold text-emerald-600">
                        Free
                      </span>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 my-6" />

                  {/* Total */}
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-800">
                      Total
                    </span>

                    <span className="text-2xl font-bold text-emerald-600">
                      ${total}
                    </span>
                  </div>

                  {/* Coupon */}
                  <div className="mt-6">
                    <CouponCard />
                  </div>

                  {/* Checkout */}
                  <Link to="/checkout" className="block mt-6">
                    <button className="w-full btn btn-soft btn-success text-xl font-semibold">
                      Checkout
                    </button>
                  </Link>

                  {/* Clear Cart */}
                  <button
                    onClick={clearProduct}
                    className="w-full mt-3 bg-red-50 hover:bg-red-100 text-red-600 font-semibold py-3 rounded-xl transition"
                  >
                    Clear Cart
                  </button>
                </div>
              </aside>
            </div>

            {/* ================= RECOMMENDATIONS ================= */}
            <section className="mt-12">
              {/* RecommendationProducts هنا */}
            </section>
          </>
        )}
      </div>
    </motion.div>
  );
}

export default Cart;
