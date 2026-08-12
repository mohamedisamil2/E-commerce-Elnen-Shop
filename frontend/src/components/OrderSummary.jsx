import { cartStore } from "../stores/cartStore";
import { orderStore } from "../stores/orderStore";

function OrderSummary({ paymentMethod, onCheckout }) {
  const { total, subTotal, totalItems } = cartStore();
  const { isCashPaymentLoading, isCheckoutLoading } = orderStore();

  return (
    <div className="w-96">
      <div className="card bg-base-100 shadow-lg p-6 sticky top-24">
        <h2 className="text-xl font-semibold mb-5">Order Summary</h2>

        <div className="space-y-3">
          <div className="flex justify-between">
            <span>Items</span>
            <span>{totalItems}</span>
          </div>

          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${subTotal}</span>
          </div>

          <div className="flex justify-between">
            <span>Shipping</span>
            <span>Free</span>
          </div>

          <hr />

          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>

            <span>${total}</span>
          </div>
        </div>

        <button
          
          onClick={onCheckout}
          className="btn btn-success mt-8 w-full"
          disabled={isCashPaymentLoading || isCheckoutLoading}
        >
          {paymentMethod === "cash" ? "Place Order" : "Pay Now"}
        </button>
      </div>
    </div>
  );
}

export default OrderSummary;
