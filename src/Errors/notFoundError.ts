import { Response } from "express";

const notFoundError = (notFound: string,res: Response) => {
  res.status(404).json({
    message: `${notFound} not found`
  });
};

export default notFoundError;
