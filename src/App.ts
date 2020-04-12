import { UnauthorizedError } from "express-jwt";
require("dotenv").config();
import startServer from "./Server";
import express, { NextFunction, Request, Response } from "express";
import connectMongoose from "./util/db";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import authRoutes from "./Routes/auth";
import userRoutes from "./Routes/user";
import categoryRoutes from "./Routes/category";
import productRoutes from "./Routes/product";
import orderRoutes from "./Routes/order";
import cartRoutes from "./Routes/cart";
const app = express();

//? DB Connection
connectMongoose()
  .then(() => {
    console.log("Database Connected!");
  })
  .catch((e: any) => {
    console.log(e, "Problem in Database Connection");
  });

//? MiddleWares
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static("uploads/"));

//? Routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRoutes);
app.use("/api", cartRoutes);

// Check for Invalid Token Error
app.use(function(err: any, req: Request, res: Response, next: NextFunction) {
  if (err.name === "UnauthorizedError") {
    res.status(err.status).send({ message: err.message });
    return;
  }
  next();
});

startServer(app);
