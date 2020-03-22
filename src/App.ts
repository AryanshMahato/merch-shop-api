import startServer from "./Server";
import express, { Response, Request } from "express";

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Server Started"
  });
});

startServer(app);
