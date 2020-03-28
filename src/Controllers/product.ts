import { NextFunction, Request, Response } from "express";
import ProductModel from "../Models/product";
import notFoundError from "../Errors/notFoundError";
import internalServerError from "../Errors/internalServerError";
import CategoryModel from "../Models/category";
import { Fields, Files, IncomingForm } from "formidable";
import fs from "fs";
import badRequest from "../Errors/badRequest";
const form = new IncomingForm();

const getAllProduct = async (req: Request, res: Response) => {
  const { limit } = req.params;
  const products = await ProductModel.find()
    .limit(+limit)
    .select("name description price category stock sold image imageExtension")
    .populate("category", "name _id")
    .exec();

  if (!products) {
    return notFoundError("Product", res);
  }
  res.status(200).json({
    message: "Products found",
    length: products.length,
    products
  });
};

const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await ProductModel.findOne({ _id: req.params.id })
      .select("name description price category stock sold")
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

const getProductImage = async (req: Request, res: Response) => {
  res.contentType(req.product.imageExtension);
  res.send(req.product.image);
};

const setProductImage = async (req: Request, res: Response) => {
  form.keepExtensions = true;
  form.parse(req, async (err, fields: Fields, files: Files) => {
    if (err) {
      return badRequest(err, res);
    }
    if (files.image) {
      if (files.image.size > 4194304) {
        return res.status(400).json({
          message: "File size too big!"
        });
      }
      const imageLocation = fs.readFileSync(files.image.path);
      const imageType = files.image.type;
      await ProductModel.findByIdAndUpdate(req.product._doc._id, {
        $set: { image: imageLocation, imageExtension: imageType }
      }).exec();

      return res.status(200).json({
        message: "Product Saved!"
      });
    }
    internalServerError("Error", res);
  });
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

export {
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  setProductInRequest,
  setProductImage,
  getProductImage,
  getAllProduct
};
