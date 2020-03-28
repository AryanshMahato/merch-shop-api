import { NextFunction, Request, Response } from "express";
import CategoryModel from "../Models/category";
import notFoundError from "../Errors/notFoundError";
import internalServerError from "../Errors/internalServerError";
import duplicateKeyError from "../Errors/duplicateKeyError";

// Middleware to set req.category
const getCategoryById = async (req: Request, res: Response) => {
  try {
    const category = await CategoryModel.findById(req.params.id).exec();
    if (!category) {
      return notFoundError("Category", res);
    }
    res.status(200).json({
      message: "Category Found!",
      category
    });
  } catch (e) {
    internalServerError(e, res);
    throw new Error(e);
  }
};

const getAllCategory = async (req: Request, res: Response) => {
  try {
    const categories = await CategoryModel.find().exec();
    if (!categories) {
      notFoundError("Categories", res);
    }
    res.status(200).json({
      message: "All categories are listed",
      categories
    });
  } catch (e) {
    internalServerError(e, res);
  }
};

const createCategory = async (req: Request, res: Response) => {
  const category = new CategoryModel({
    name: req.body.name,
    createdBy: req.auth!._id
  });
  try {
    await category.save();
    res.status(200).json({
      message: "Category Created!",
      category: req.body.name,
      // @ts-ignore
      createdBy: category.createdBy
    });
  } catch (e) {
    duplicateKeyError(e, res);
    console.error(e);
  }
};

const updateCategory = async (req: Request, res: Response) => {
  try {
    await CategoryModel.findByIdAndUpdate(req.category._id, {
      $set: { ...req.body }
    }).exec();
    res.status(200).json({
      message: "Category Updated",
      category: { ...req.category._doc }
    });
  } catch (e) {
    internalServerError(e, res);
    throw new Error(e);
  }
};

const deleteCategory = async (req: Request, res: Response) => {
  try {
    await CategoryModel.findByIdAndDelete(req.params.id).exec();
    res.status(200).json({
      message: "Category Deleted!",
      category: { ...req.category._doc }
    });
  } catch (e) {
    internalServerError(e, res);
    throw new Error(e);
  }
};

// Sets value of req.category or throws error
const getCategoryMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      message: "No Id found"
    });
  }
  const category = await CategoryModel.findById(id)
    .select("name _id")
    .exec();
  if (!category) {
    return notFoundError("Category", res);
  }
  req.category = category;
  next();
};

export {
  getCategoryById,
  createCategory,
  getAllCategory,
  updateCategory,
  deleteCategory,
  getCategoryMiddleware
};
