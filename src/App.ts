import startServer from "./Server";
import express, { Request, Response } from "express";
import connectMongoose from "./util/db";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

require("dotenv").config();

const app = express();

connectMongoose()
  .then(() => {
    console.log("Database Connected!");
  })
  .catch((e: any) => {
    console.log(e, "Problem in Database Connection");
  });

app.use(cors);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Hello World!"
  });
});

startServer(app);
