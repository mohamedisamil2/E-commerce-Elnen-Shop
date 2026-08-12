import { ShoppingCart } from "lucide-react";
import { cartStore } from "../stores/cartStore";
import { Link } from "react-router-dom";

function CartLogo() {
  const { totalItems } = cartStore();

  return (
    <Link to="/cart">
      <div className="relative ">
        <ShoppingCart
          className={`text-xl font-bold ${
            totalItems > 0 ? "text-green-600" : "text-red-600"
          }`}
        />
        <div className="absolute -top-5 -right-1  ">
          <span
            className={`text-xl font-bold ${
              totalItems > 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {totalItems}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default CartLogo;
