import { ShoppingBag } from "lucide-react";

function EmptyCart() {
  return (
    <div>
      <div className="flex flex-col items-center justify-center py-24">
        <div className="w-36 h-20 rounded-full bg-gray-100 flex items-center justify-center transition hover:scale-110">
          <ShoppingBag className="text-blue-400" size={70} strokeWidth={1.5} />
        </div>

        <h2 className="text-xl font-semibold py-10">Your cart is empty</h2>

        <p className="mt-3 text-gray-500 text-center max-w-md">
          You haven't placed any orders yet. Start shopping to discover amazing
          products.
        </p>

        <button className="mt-8 px-8 py-3 bg-linear-to-r  from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-lg font-semibold transition">
          Start Shopping
        </button>
      </div>
    </div>
  );
}

export default EmptyCart;
