import { cartStore } from "../stores/cartStore";

function CartItems({ item }) {
  const { updateQuantity, deleteProductFromCart } = cartStore();

  return (
    <div className="flex gap-5 py-4 border-b border-gray-200 z-50">
      <img
        src={item.product.image.url}
        alt={item.product.name}
        className="w-28 h-28 object-cover rounded-lg"
      />
      <div className="flex flex-col gap-2 ">
        <h1 className="text-2xl font-semibold text-slate-900">{item.name}</h1>
        <p className="text-xl text-slate-400">
          {item.description.slice(0, 149)}
        </p>
        <p className="text-xl text-green-700">price: ${item.product.price}</p>
        <p className="text-xl text-slate-900">quantity: {item.quantity}</p>
        <p className="text-xl text-slate-900">
          CountInStock: {item.product.countInStock}
        </p>
        <div className="flex items-center justify-between w-70 shadow-sm">
          <button
            className="btn btn-error relative z-9999"
            onClick={() => {
              console.log("Minus CLICKED");
              if (item.quantity === 1) {
                deleteProductFromCart(item.product._id);
              } else {
                updateQuantity(item.product._id, -1);
              }
            }}
          >
            -
          </button>
          <p>{item.quantity}</p>
          <button
            className="btn btn-success "
            onClick={() => {
              console.log("PLUS CLICKED");

              updateQuantity(item.product._id, 1);
            }}
          >
            +
          </button>
        </div>

        <button
          className="w-full bg-red-400"
          onClick={() => deleteProductFromCart(item.product._id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default CartItems;
