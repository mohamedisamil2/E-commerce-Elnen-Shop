import { useEffect } from "react";
import { userProductStore } from "../stores/userProduct";
import { useParams } from "react-router-dom";
import { LoaderIcon, ShoppingCart } from "lucide-react";
import { cartStore } from "../stores/cartStore";

function Category() {
  const { getCategoryByCategory, product, isLoading } = userProductStore();

  const { addToCart, isLoadingCart } = cartStore();

  const { category } = useParams();

  useEffect(() => {
    getCategoryByCategory(category);
  }, [category, getCategoryByCategory]);

  if (isLoading) return <h1>loading...</h1>;

  console.log("category", category);
  console.log("product", product);

  return (
    <div className="container mx-auto space-y-6">
      <h1 className="text-xl md:text-2xl w-fit font-semibold bg-linear-to-r from-green-500 via-green-900 to-green-300 rounded-bl-full rounded-tr-full px-4 py-2">
        {category}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {product.map((prod) => (
          <div key={prod._id} className="">
            {/* Card */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden h-full ">
              {/* Image */}
              <div className="h-64 bg-gray-100">
                <img
                  src={prod.image?.url}
                  alt={prod.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-semibold text-lg text-gray-800 mb-2">
                  {prod.name}
                </h3>

                <p className="text-emerald-600 font-bold text-xl mb-4">
                  ${prod.price?.toFixed(2)}
                </p>

                <button
                  onClick={() => addToCart(prod)}
                  disabled={isLoadingCart}
                  className="w-full bg-linear-to-r from-green-500 via-green-900 to-green-300  text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2"
                >
                  {isLoadingCart ? (
                    <LoaderIcon className="w-full h-6 animate-spin text-center" />
                  ) : (
                    <>
                      <ShoppingCart className="w-5 h-5" />
                      Add to Cart
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Category;
