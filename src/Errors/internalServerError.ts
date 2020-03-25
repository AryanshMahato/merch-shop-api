import { Response } from "express";

const internalServerError = (err: any, res: Response) => {
  res.status(500).json({
    message: "Internal Server Error",
    error: err
  });
};

export default internalServerError;
