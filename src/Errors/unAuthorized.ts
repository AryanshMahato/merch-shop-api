import { Response } from "express";

const unAuthorizedError = (res: Response) => {
  res.status(403).json({
    message: "UnAuthorized Error",
    error: "Access Denied"
  });
};

export default unAuthorizedError;
