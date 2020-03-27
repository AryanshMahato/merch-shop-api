import { NextFunction, Request, Response } from "express";
import CategoryModel from "../Models/category";
import notFoundError from "../Errors/notFoundError";
import internalServerError from "../Errors/internalServerError";
import duplicateKeyError from "../Errors/duplicateKeyError";

// Middleware to set req.category
const getCategoryById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const category = await CategoryModel.findById(req.params.id).exec();
    if (!category) {
      return notFoundError("Category", res);
    }
    req.category = category;
    next();
  } catch (e) {
    internalServerError(e, res);
    throw new Error(e);
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

export { getCategoryById, createCategory };
