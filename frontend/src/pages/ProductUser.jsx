import { useEffect } from "react";
import CardProducts from "../components/CardProducts";
import { userProductStore } from "../stores/userProduct";
import { motion } from "framer-motion";
import SkeletonLoadingProduct from "../components/SkeletonLoadingProduct";

function ProductUser() {
  const { product, getProduct, isLoading } = userProductStore();

  useEffect(() => {
    getProduct();
  }, [getProduct]);

  // console.log(isLoading);

  return (
    <>
      {isLoading ? (
        <SkeletonLoadingProduct />
      ) : (
        <div className="container mx-auto">
          <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {product.map((item, index) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 1 }}
                transition={{
                  duration: 0.5,
                  delay: index * 1,
                }}
              >
                <CardProducts product={item} />
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default ProductUser;
