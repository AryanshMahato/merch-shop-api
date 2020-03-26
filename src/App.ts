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

//? Routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);

// Check for Invalid Token Error
app.use(function(err: any, req: Request, res: Response, next: NextFunction) {
  if (err.name === "UnauthorizedError") {
    res.status(err.status).send({ message: err.message });
    return;
  }
  next();
});

startServer(app);
