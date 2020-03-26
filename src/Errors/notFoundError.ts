import { Response } from "express";

const notFoundError = (res: Response) => {
  res.status(404).json({
    message: "USER not found"
  });
};

export default notFoundError;
