import { Request, Response } from "express";
import ProductModel from "../../Models/product";
import internalServerError from "../../Errors/internalServerError";

const createProduct = async (req: Request, res: Response) => {
  req.body.imageName = req.file.filename;
  try {
    const product = new ProductModel(req.body);
    await product.save();
    res.status(201).json({
      message: "Product Created",
      product: {
        // @ts-ignore
        name: product.name,
        _id: product._id
      }
    });
  } catch (e) {
    internalServerError(e, res);
  }
};

export default createProduct;
