import { Response } from "express";

const duplicateKeyError = (err: any, res: Response) => {
  res.status(400).json({
    message: "Duplicate Key Error",
    error: err
  });
};

export default duplicateKeyError;
