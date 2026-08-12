import express, { urlencoded } from "express";
import dotenv from "dotenv";
import connectDB from "./lib/connectDB.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import usersRoute from "./routes/usersRoute.js";
import productsRoute from "./routes/productsRoute.js";
import cartRoute from "./routes/cartRoute.js";
import couponRoute from "./routes/couponRoute.js";
import orderRoute from "./routes/orderRoute.js";
import analyticsRoute from "./routes/analyticsRoute.js";
import { errHandler, NotFound } from "./middleware/errorMiddleware.js";

dotenv.config();

// console.log(process.env.MONGO_URI)

const port = process.env.PORT;
const app = express();

// middleware
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true, limit: "20mb" }));
app.use(cookieParser());
app.use(cors({ origin: process.env.CLIENT_URI, credentials: true }));

// route of users
app.use("/api/user", usersRoute);
app.use("/api/product", productsRoute);
app.use("/api/cart", cartRoute);
app.use("/api/coupon", couponRoute);
app.use("/api/order", orderRoute);
app.use("/api/analytic", analyticsRoute);
//

// error middleware
app.use(NotFound);
app.use(errHandler);

app.listen(port, () => {
  console.log(`server running on port ${port}`);
  connectDB();
});
