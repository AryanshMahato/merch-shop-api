import { Response } from "express";

const badRequest = (err: any, res: Response) => {
  res.status(400).json({
    message: "Bad Request",
    error: err
  });
};

export default badRequest;
