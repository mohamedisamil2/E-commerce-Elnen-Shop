import { ShoppingCart } from "lucide-react";
import { cartStore } from "../stores/cartStore";

function CardProducts({ product }) {
  const { addToCart, isLoadingCart } = cartStore();
  //   console.log(addToCart);
  return (
    <div className="card bg-base-100 shadow-sm w-full ">
      <figure className="h-80 overflow-hidden">
        <img
          src={product.image.url}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-1000 hover:-scale-150"
        />
      </figure>
      <div className="card-body">
        <h1 className="card-title">{product.name}</h1>
        <p className="">{product.description}</p>
        <div className="flex justify-between items-center">
          <span>${product.price}</span>

          <button
            disabled={isLoadingCart}
            className=" bg-linear-to-r from-green-500 via-green-900 to-green-300  text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2"
            onClick={() => addToCart(product)}
          >
            <ShoppingCart className="w-5 h-5" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default CardProducts;
