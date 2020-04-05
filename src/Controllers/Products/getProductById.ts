import { Request, Response } from "express";
import ProductModel from "../../Models/product";
import notFoundError from "../../Errors/notFoundError";
import internalServerError from "../../Errors/internalServerError";

const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await ProductModel.findOne({ _id: req.params.id })
      .select("name description price category stock sold imageName")
      .populate("category", "_id name")
      .exec();
    if (!product) {
      notFoundError("Products", res);
    }
    res.status(200).json({
      message: "Product Found!",
      product
    });
  } catch (e) {
    internalServerError(e, res);
  }
};

export default getProductById;
