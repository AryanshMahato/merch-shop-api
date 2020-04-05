import { Request, Response } from "express";
import ProductModel from "../../Models/product";
import notFoundError from "../../Errors/notFoundError";
import IProduct from "../../../types/models/Models/Product";

const getAllProduct = async (req: Request, res: Response) => {
  const { limit } = req.params;

  const products: Array<IProduct> = await ProductModel.find()
    .limit(+limit)
    .select("name description price category stock sold imageName")
    .populate("category", "name _id")
    .exec();

  if (!products.length) {
    return notFoundError("Product", res);
  }

  res.status(200).json({
    message: "Products found",
    length: products.length,
    products
  });
};

export default getAllProduct;
