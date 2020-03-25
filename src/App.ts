import startServer from "./Server";
import express, { Request, Response } from "express";
import connectMongoose from "./util/db";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import authRoutes from "./Routes/auth";
require("dotenv").config();
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

app.use("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Hello World!"
  });
});

startServer(app);
