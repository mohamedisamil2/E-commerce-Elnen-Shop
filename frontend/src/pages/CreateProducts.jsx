import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { productSchema } from "../schema/createProduct";
import { adminProductStore } from "../stores/ProductStore";
import { useState } from "react";
import { LoaderIcon, ShoppingCart } from "lucide-react";

function CreateProducts() {
  const { createProduct, isCreating } = adminProductStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(productSchema) });

  async function submitHandler(data) {
    const success = await createProduct({
      ...data,
      image,
    });
    if (success) {
      reset();
    }
  }

  const inputStyle =
    "w-full rounded-xl border border-green-500 bg-green-700 py-3 px-2 text-white";

  const [image, setImage] = useState("");

  // handleImage
  const handleImage = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImage(reader.result);
        // console.log(image);
      };

      reader.readAsDataURL(file);
    }
  };

  // console.log(handleImage)
  return (
    <div className="bg-white rounded-md w-1/2 text-green-700 shadow-sm p-6">
      <div className="flex flex-col items-center space-y-4 ">
        <div className="mt-6 ">
          <h1 className="text-2xl font-medium">Create Products</h1>
        </div>
        <form
          onSubmit={handleSubmit(submitHandler)}
          className="flex flex-col w-full mt-8 space-y-4"
        >
          <div className="flex flex-col space-y-2">
            <label>Product Name</label>
            <input
              type="text"
              {...register("name")}
              placeholder="Enter product Name"
              className={inputStyle}
            />
            {errors.name && (
              <p className="text-red-600 z-10 mt-1.5">{errors.name.message}</p>
            )}
          </div>
          <div className="flex flex-col space-y-2">
            <label>Product description</label>
            <textarea
              maxLength={1000}
              {...register("description")}
              placeholder="Enter product description"
              className={inputStyle}
            ></textarea>
            {errors.description && (
              <p className="text-red-600 z-10 mt-1.5">
                {errors.description.message}
              </p>
            )}
          </div>
          <div className="flex flex-col space-y-2">
            <label>Category Name</label>
            <input
              type="text"
              {...register("category")}
              placeholder="Enter category Name"
              className={inputStyle}
            />
            {errors.category && (
              <p className="text-red-600 z-10 mt-1.5">
                {errors.category.message}
              </p>
            )}
          </div>
          <div className="flex flex-col space-y-2">
            <label>Price</label>
            <input
              type="number"
              {...register("price")}
              placeholder="Enter Price"
              className={inputStyle}
            />
            {errors.price && (
              <p className="text-red-600 z-10 mt-1.5">{errors.price.message}</p>
            )}
          </div>
          <div className="flex flex-col space-y-2">
            <label>Count In Stock</label>
            <input
              type="number"
              {...register("countInStock")}
              placeholder="Enter Count In Stock"
              className={inputStyle}
            />
            {errors.countInStock && (
              <p className="text-red-600 z-10 mt-1.5">
                {errors.countInStock.message}
              </p>
            )}
          </div>
          <div className="flex flex-col space-y-2">
            <label>Image</label>
            <input
              type="file"
              onChange={handleImage}
              placeholder="Upload Image"
              className="w-full rounded-xl h-20 border border-green-500 bg-green-700 py-3 px-2 text-white"
            />
            {/* {errors.image && (
              <p className="text-red-600 z-10 mt-1.5">{errors.image.message}</p>
            )} */}
          </div>

          <div className="flex justify-between ">
            <button className="btn btn-error w-2/5">Cancel</button>
            <button
              className="w-full bg-linear-to-r from-green-500 via-green-900 to-green-300  text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2"
              type="submit"
            >
              {isCreating ? (
                <LoaderIcon className="w-full h-6 animate-spin text-center" />
              ) : (
                <>
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateProducts;
