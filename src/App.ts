import startServer from "./Server";
import express, { Request, Response } from "express";
import connectMongoose from "./util/db";

const app = express();

connectMongoose()
  .then(() => {
    console.log("Database Connected!");
  })
  .catch(e => {
    console.log(e, "Problem in Database Connection");
  });

app.use("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Hello World!"
  });
});

startServer(app);
