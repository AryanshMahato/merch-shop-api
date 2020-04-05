import { Request, Response } from "express";
import CategoryModel from "../../Models/category";
import notFoundError from "../../Errors/notFoundError";
import ProductModel from "../../Models/product";
import internalServerError from "../../Errors/internalServerError";

const updateProduct = async (req: Request, res: Response) => {
  const productId = req.params.id;

  try {
    // Check if category is valid (If provided)
    const categoryId = req.body.category;

    if (categoryId) {
      const category = await CategoryModel.findById(categoryId).exec();
      if (!category) {
        return notFoundError("Category", res);
      }
    }

    await ProductModel.updateOne(
      { _id: productId },
      { $set: { ...req.body } }
    ).exec();
    res.status(200).json({
      message: "Product Updated",
      product: {
        name: req.body.name,
        _id: req.product._doc._id
      }
    });
  } catch (e) {
    internalServerError(e, res);
  }

  res.status(200);
};

export default updateProduct;
