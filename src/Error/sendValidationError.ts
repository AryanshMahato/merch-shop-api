import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

const sendValidationError = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      message: "Request body is not correct",
      error: errors.array()
    });
  }
  next();
};

export default sendValidationError;
