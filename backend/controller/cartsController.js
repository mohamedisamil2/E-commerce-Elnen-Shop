import asyncHandler from "express-async-handler";
import Products from "../model/productModel.js";
import Carts from "../model/cartModel.js";

// Add Product to Cart
const addToCart = asyncHandler(async (req, res) => {
  console.log("body:", req.body);
  const { productId } = req.body;

  console.log(productId);
  const product = await Products.findById(productId);

  if (!product) {
    res.status(404);
    throw new Error("Product Not Found");
  }

  // المنتج غير متوفر
  if (product.countInStock === 0) {
    res.status(400);
    throw new Error("Product is out of stock");
  }

  // find user Id
  let cart = await Carts.findOne({ user: req.user._id });

  // Create Cart If is not found Cart
  if (!cart) {
    cart = new Carts({
      user: req.user._id,
      cartItems: [],
    });
  }

  const existItem = cart.cartItems.find(
    (item) => item.product && item.product.toString() === productId,
  );

  // If exist item increase quantity or add new item into cart
  if (existItem) {
    //Ensure that stock levels are not exceeded
    if (existItem.quantity + quantity > product.countInStock) {
      res.status(400);
      throw new Error(`Only ${product.countInStock} items available in stock`);
    }
    existItem.quantity += 1;
  } else {
    // // Confirm the Required Quantity
    // if (quantity > product.countInStock) {
    //   res.status(400);
    //   throw new Error(`Only ${product.countInStock} items available in stock`);

    cart.cartItems.push({
      product: productId,
      name: product.name,
      image: product.image,
      description: product.description,
      price: product.price,
      quantity: 1,
    });
  }

  // Save Item into Cart
  console.log("Before save:", cart);

  const saveItem = await cart.save();

  console.log("After save:", saveItem);

  // إرجاع السلة مع بيانات المنتجات
  await saveItem.populate({
    path: "cartItems.product",
    select: "name price image description countInStock category",
  });

  res.status(201).json(saveItem);
});

// Get Cart of Product
const getCartProduct = asyncHandler(async (req, res) => {
  const cart = await Carts.findOne({ user: req.user._id }).populate(
    "cartItems.product",
    "title price image countInStock",
  );

  // if cart is empty return empty
  if (!cart) {
    return res.json({ cartItems: [] });
  } else {
    res.status(200).json(cart.cartItems);
  }
});

// Update quantity in Cart
const updateQuantityInCart = asyncHandler(async (req, res) => {
  const { productId, quantity } = req.body;

  const qty = Number(quantity);

  if (isNaN(qty)) {
    res.status(400);
    throw new Error("Invalid quantity");
  }

  const cart = await Carts.findOne({ user: req.user._id });

  if (!cart) {
    return res.json([]);
  }

  const item = cart.cartItems.find(
    (item) => item.product.toString() === productId,
  );

  if (!item) {
    res.status(404);
    throw new Error("Item not found");
  }

  const product = await Products.findById(productId);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  if (item.quantity + qty > product.countInStock) {
    res.status(400);
    throw new Error(`Only ${product.countInStock} item(s) available`);
  }

  if (item.quantity + qty < 1) {
    res.status(400);
    throw new Error("Quantity cannot be less than 1");
  }

  item.quantity += qty;

  await cart.save();

  await cart.populate("cartItems.product");

  res.status(200).json(cart.cartItems);
});

// Delete Product from Cart
const deleteProductFromCart = asyncHandler(async (req, res) => {
  const { productId } = req.body;

  if (!productId) {
    res.status(404);
    throw new Error("ProductId not found");
  }

  const cart = await Carts.findOne({ user: req.user._id });

  if (!cart) {
    res.status(404);
    throw new Error("Cart not found");
  }

  const itemExists = cart.cartItems.some(
    (item) => item.product.toString() === productId,
  );

  if (!itemExists) {
    res.status(404);
    throw new Error("Product not found in Cart");
  }

  cart.cartItems = cart.cartItems.filter(
    (item) => item.product.toString() !== productId,
  );

  await cart.save();

  await cart.populate("cartItems.product");

  res.status(200).json(cart.cartItems);
});

// Clear All Product from Cart
const clearAllProductFromCart = asyncHandler(async (req, res) => {
  const cart = await Carts.findOne({ user: req.user._id });

  if (!cart) {
    res.status(404);
    throw new Error("Cart not found");
  }

  cart.cartItems = [];

  await cart.save();

  res
    .status(200)
    .json({ message: "Cleared All product from cart successfully", cart });
});

export {
  addToCart,
  getCartProduct,
  updateQuantityInCart,
  deleteProductFromCart,
  clearAllProductFromCart,
};
