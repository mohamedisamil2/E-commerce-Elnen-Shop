import { useEffect } from "react";
import FeaturedProducts from "../components/FeaturedProducts";
import Footer from "../components/Footer";
import { userProductStore } from "../stores/userProduct";
import { motion } from "framer-motion";
import CategoryItem from "../components/CategoryItem";
import Hero from "../components/Hero";
import ShopWithUs from "../components/ShopWithUs";

const categories = [
  {
    name: "Apple",
    imageUrl:
      "https://res.cloudinary.com/kwylkmsp/image/upload/v1785754721/products/y9ymsum3r33xx5nznuuo.jpg",
  },
  {
    name: "Samsung",
    imageUrl:
      "https://res.cloudinary.com/kwylkmsp/image/upload/v1785773352/products/by8i3mmjt55nfy3lufxb.jpg",
  },
];

function Home() {
  const { product, getFeatured, isLoading } = userProductStore();

  useEffect(() => {
    getFeatured();
  }, [getFeatured]);

  if (isLoading) return <p>loading...</p>;
  return (
    <div className="container mx-auto relative min-h-screen space-y-12 text-white overflow-hidden mt-30">
      
      {/* Hero */}
      <Hero />

      {/* Categry */}
      <section className="relative z-40 py-16">
        <h1 className="text-center text-5xl sm:text-6xl font-bold text-emerald-400 mb-4">
          Explore Our Categories
        </h1>
        <p className="text-center text-xl text-gray-300 mb-12">
          Discover the latest trends in eco-friendly fashion
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {categories.map((category) => (
            <CategoryItem category={category} key={category.name} />
          ))}
        </div>
        </section>

        {/* featured */}
        <motion.div
          initial={{ x: 10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -10, opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {product?.length > 0 && (
            <FeaturedProducts featuredProducts={product} />
          )}
        </motion.div>

      {/* Shop with Us */}
      <ShopWithUs/>
      
      {/* footer */}
      <Footer />
    </div>
  );
}

export default Home;
