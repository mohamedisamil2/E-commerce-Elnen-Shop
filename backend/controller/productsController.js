import asyncHandler from "express-async-handler";
import Products from "../model/productModel.js";
import { radis } from "../lib/radis.js";
import cloudinary from "../lib/cloudinary.js";

// Create New Products
const createNewProducts = asyncHandler(async (req, res) => {
  const { name, description, image, price, category, countInStock } = req.body;

  const existProduct = await Products.findOne({ name });

  if (existProduct) {
    res.status(401);
    throw new Error("Aready Product Exist ");
  }

  // clodinary this is best way to upload image
  let imageUrl = {
    url: "",
    public_id: "",
  };

  if (image) {
    const uploadImg = await cloudinary.uploader.upload(image, {
      folder: "products",
    });
    imageUrl = {
      url: uploadImg.secure_url,
      public_id: uploadImg.public_id,
    };
  }

  const product = await Products.create({
    name,
    description,
    price,
    image: imageUrl,
    category,
    countInStock,
    user: req.user._id,
  });

  res.status(201).json(product);
});

// Get All Products to Admin
const getAllProducts = asyncHandler(async (req, res) => {
  const product = await Products.find({});

  res.status(200).json(product);
});

// Get All Products to Users
const getAllProduct = asyncHandler(async (req, res) => {
  const product = await Products.find({});

  res.status(200).json(product);
});

// Get Products By Category
const getProductsByCategory = asyncHandler(async (req, res) => {
  const { category } = req.params;
  const product = await Products.find({ category });

  res.status(200).json(product);
});

// Get Product By Keyword Search about like name or category
const getProductsByKeywordSearch = asyncHandler(async (req, res) => {
  const keyword = req.query.keyword;

  let filter = {};

  if (keyword) {
    filter = {
      $or: [
        {
          name: {
            $regex: keyword,
            $options: "i",
          },
        },
        {
          category: {
            $regex: keyword,
            $options: "i",
          },
        },
      ],
    };
  }
  const product = await Products.find(filter);
  res.status(200).json(product);
});

// Get Recommendation Products
const getRecommendationProducts = asyncHandler(async (req, res) => {
  const product = await Products.aggregate([
    {
      $sample: { size: 4 },
    },
    {
      $project: {
        _id: 1,
        name: 1,
        _description: 1,
        image: 1,
        price: 1,
      },
    },
  ]);
  res.status(200).json(product);
});

// Get Featured Products
const getFeaturedProducts = asyncHandler(async (req, res) => {
  let featuredProduct = await radis.get("featured_product");

  if (featuredProduct) {
    res.json(JSON.parse(featuredProduct));
  }

  featuredProduct = await Products.find({ isFeatured: true }).lean();

  if (!featuredProduct) {
    res.status(404).json({ message: "featured product not found" });
  }

  // store in redis for future quick access
  await radis.set("featured_product", JSON.stringify(featuredProduct));

  res.status(200).json(featuredProduct);
});

// Patch Products like price or Name
const updatePartOfProducts = asyncHandler(async (req, res) => {
  const product = await Products.findById(req.params.id); // search of product

  if (!product) {
    // Is not find product return message
    res.status(404);
    throw new Error("Product Not Found");
  }

  // Data update
  product.name = req.body.name || product.name;
  product.description = req.body.description || product.description;
  product.price = req.body.price ?? product.price;
  //Why did I write ?? and not ||(logical OR) cuz ||
  //considers the value 0 to be invalid and returns false.
  //Always be careful when using numeric fields,use ??(Nullish Coalescing Operator)
  product.countInStock = req.body.countInStock ?? product.countInStock;
  product.category = req.body.category || product.category;
  product.isFeatured = req.body.isFeatured || product.isFeatured;

  // save update
  const updateSave = await product.save();
  res.status(200).json(updateSave);
});

// to toggle featured
const toggleFeaturedProduct = asyncHandler(async (req, res) => {
  const product = await Products.findById(req.params.id);

  if (product) {
    product.isFeatured = !product.isFeatured;
    const updateProduct = await product.save();
    await updateFeaturedProductCache();
    res.json(updateProduct);
  } else {
    res.status(404).json({ message: "product not found" });
  }
});

// delete Products
const deleteProducts = asyncHandler(async (req, res) => {
  const product = await Products.findByIdAndDelete(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product Not Found");
  }

  res.status(200).json(product);
});

// Delete Many Products in the future inshalah
// const deleteProducts = asyncHandler(async (req, res) => {
//   const { ids } = req.body;

//   if (!Array.isArray(ids) || ids.length === 0) {
//     res.status(400);
//     throw new Error("No Product Selected");
//   }

//   // to delete products by selected
//   const result = await Products.delete({
//     _id: {
//       $in: ids,
//     },
//   });
//   res.status(200).json({
//     success: true,
//     deletedCount: result.deletedCount,
//     message: "Product deleted Successfully",
//   });
// });

// create function to update cache
async function updateFeaturedProductCache() {
  try {
    const featuredProduct = await Products.find({ isFeatured: true }).lean();
    await radis.set("featured_product", JSON.stringify(featuredProduct));
  } catch (error) {
    console.log("Error updating featured cache:", error.message);
  }
}

export {
  createNewProducts,
  getAllProducts,
  getAllProduct,
  getProductsByKeywordSearch,
  getFeaturedProducts,
  toggleFeaturedProduct,
  getProductsByCategory,
  getRecommendationProducts,
  updatePartOfProducts,
  deleteProducts,
};
