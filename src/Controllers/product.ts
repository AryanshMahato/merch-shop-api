import { NextFunction, Request, Response } from "express";
import ProductModel from "../Models/product";
import notFoundError from "../Errors/notFoundError";
import internalServerError from "../Errors/internalServerError";
import CategoryModel from "../Models/category";

const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await ProductModel.find({ _id: req.params.id })
      .select("name description price category stock sold photo")
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

const createProduct = async (req: Request, res: Response) => {
  try {
    const product = new ProductModel(req.body);
    await product.save();
    res.status(201).json({
      message: "Product Created",
      product: {
        // @ts-ignore
        name: product.name,
        id: product._id
      }
    });
  } catch (e) {
    internalServerError(e, res);
  }
};

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
        id: req.product._doc._id
      }
    });
  } catch (e) {
    internalServerError(e, res);
  }

  res.status(200);
};

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
        id: product._id
      }
    });
  } catch (e) {
    internalServerError(e, res);
  }
};

// Middleware that sets req.product
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
      .select("_id name description price category stock sold photo")
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

export {
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  setProductInRequest
};
