// Middleware that sets req.product
import { NextFunction, Request, Response } from "express";
import notFoundError from "../../Errors/notFoundError";
import ProductModel from "../../Models/product";
import internalServerError from "../../Errors/internalServerError";

const setProductInRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.body.product || req.params.id;
    if (!id) {
      return notFoundError("Id", res);
    }

    const product = await ProductModel.findById(id)
      .select(
        "_id name description price category stock sold image imageExtension"
      )
      .populate("category");
    if (!product) {
      return notFoundError("Product", res);
    }

    req.product = product;
    next();
  } catch (e) {
    internalServerError(e, res);
  }
};

export { setProductInRequest };
