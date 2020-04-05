import { Request, Response } from "express";
import ProductModel from "../../Models/product";
import notFoundError from "../../Errors/notFoundError";
import internalServerError from "../../Errors/internalServerError";

const deleteProduct = async (req: Request, res: Response) => {
  const productId = req.params.id;
  try {
    // Check if Product Id is valid
    const product = await ProductModel.findById(productId).exec();
    if (!product) {
      return notFoundError("Product", res);
    }

    // Delete Product
    await product.remove();
    res.status(200).json({
      message: "Product Deleted",
      product: {
        name: req.body.name,
        _id: product._id
      }
    });
  } catch (e) {
    internalServerError(e, res);
  }
};

export default deleteProduct;
