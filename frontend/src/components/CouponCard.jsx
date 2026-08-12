import { useEffect, useState } from "react";
import { cartStore } from "../stores/cartStore";

function CouponCard() {
  const [code, setCode] = useState("");
  const { applyCoupon, getMyCoupon } = cartStore();

  useEffect(() => {
    getMyCoupon();
  }, [getMyCoupon]);

  return (
    <div className="flex flex-col space-y-5 bg-white shadow-sm ">
      <input
        type="text"
        placeholder="Enter coupon code"
        className="input input-success"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />

      <button
        className="btn btn-soft btn-accent text-xl font-semibold"
        onClick={() => applyCoupon(code)}
      >
        Apply
      </button>
    </div>
  );
}

export default CouponCard;
