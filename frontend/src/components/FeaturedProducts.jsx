import { useEffect, useState } from "react";
import { cartStore } from "../stores/cartStore";
import { ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";

function FeaturedProducts({ featuredProducts = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  const { addToCart } = cartStore();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2);
      } else if (window.innerWidth < 1280) {
        setItemsPerPage(3);
      } else {
        setItemsPerPage(4);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  //   // Reset index if screen size changes
  //   useEffect(() => {
  //     setCurrentIndex(0);
  //   }, [itemsPerPage]);

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      Math.min(
        prev + itemsPerPage,
        Math.max(featuredProducts.length - itemsPerPage, 0),
      ),
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - itemsPerPage, 0));
  };

  const isStartDisabled = currentIndex === 0;

  const isEndDisabled =
    currentIndex >= Math.max(featuredProducts.length - itemsPerPage, 0);

  if (featuredProducts.length === 0) {
    return null;
  }

  return (
    <section className="w-full py-10">
      {/* Title */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-emerald-600">
          Featured Products
        </h2>
      </div>

      {/* Carousel container */}
      <div className="relative overflow-hidden">
        {/* Products */}
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / itemsPerPage)}%)`,
          }}
        >
          {featuredProducts.map((item) => (
            <div
              key={item._id}
              className="shrink-0 w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 px-2"
            >
              {/* Card */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden h-full border">
                {/* Image */}
                <div className="h-56 overflow-hidden">
                  <img
                    src={item.image?.url}
                    alt={item.name}
                    className="h-full w-full object-cover transition duration-500 hover:scale-105"
                  />
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-semibold text-lg text-gray-800 mb-2">
                    {item.name}
                  </h3>

                  <p className="text-emerald-600 font-bold text-xl mb-4">
                    ${item.price?.toFixed(2)}
                  </p>

                  <button
                    onClick={() => addToCart(item)}
                    className=" bg-linear-to-r from-green-500 via-green-900 to-green-300   hover:from-green-400 hover:via-green-600 hover:to-green-300  text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center w-full gap-2"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Previous */}
        <button
          onClick={prevSlide}
          disabled={isStartDisabled}
          className={`absolute top-1/2 -left-2 transform -translate-y-1/2 p-2 rounded-full text-white transition-colors duration-300 ${
            isStartDisabled
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-emerald-600 hover:bg-emerald-500"
          }`}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Next */}
        <button
          onClick={nextSlide}
          disabled={isEndDisabled}
          className={`absolute top-1/2 -right-2 transform -translate-y-1/2 p-2 rounded-full text-white transition-colors duration-300 ${
            isEndDisabled
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-emerald-600 hover:bg-emerald-500"
          }`}
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </section>
  );
}

export default FeaturedProducts;
