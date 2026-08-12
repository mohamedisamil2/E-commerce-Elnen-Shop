import asyncHandler from "express-async-handler";
import Users from "../model/userModel.js";
import { generateToken } from "../utils/generateToken.js";
import { radis } from "../lib/radis.js";

// Registered User
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const existUser = await Users.findOne({ email });

  if (existUser) {
    res.status(404);
    throw new Error("Already User Exist ");
  }

  const user = await Users.create({ name, email, password });

  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } else {
    res.status(401);
    throw new Error("Invalid User Data");
  }
});

// Auhentication Users
const authtoLoginUsers = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await Users.findOne({ email }); // cuz he is unique

  if (user && (await user.matchPassword(password))) {
    // check password is it or not
    generateToken(res, user._id);
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// Logout Users
const logoutUser = asyncHandler(async (req, res) => {
  const token = req.cookies.jwt;

  if (token) {
    await radis.set(`blacklist:${token}`, "true", "EX", 60 * 60 * 24 * 7);
  }

  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "User Logout Successfully" });
});

// get profile
const getUserProfile = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
  };

  res.status(200).json(user);
});

// update profile
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await Users.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password || user.password;
    }

    const updateUser = await user.save();
    res.status(200).json({
      _id: updateUser._id,
      name: updateUser.name,
      email: updateUser.email,
    });
  } else {
    res.status(400);
    throw new Error("User Not Found ");
  }
});

export {
  registerUser,
  authtoLoginUsers,
  logoutUser,
  getUserProfile,
  updateUserProfile,
};
