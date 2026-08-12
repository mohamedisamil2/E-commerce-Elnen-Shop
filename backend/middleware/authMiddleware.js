import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import Users from "../model/userModel.js";
import { radis } from "../lib/radis.js";

const protect = asyncHandler(async (req, res, next) => {
  // console.log("1- protect started");
  let token = req.cookies.jwt;

  // console.log("2- cookies:", req.cookies);
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.TOKEN_NODE);
      const blackListed = await radis.get(`blacklist:${token}`);

      if (blackListed) {
        res.status(401);
        throw new Error("Token has been revoked");
      }
      const user = await Users.findById(decoded.userId).select("-password");

      req.user = user;
      // console.log("3- before next()");
      next();
    } catch (error) {
      res.status(401);
      // console.log("4- error:", err);
      throw new Error(error?.message);
    }
  } else {
    res.status(401);
    throw new Error("Not Authorized, Invalid token");
  }
});

// access admin
const adminAuth = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    return next();
  } else {
    res.status(403);
    throw new Error("Access denied, Admin Only");
  }
});

export { protect, adminAuth };
