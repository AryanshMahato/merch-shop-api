import { Request, Response } from "express";
import CategoryModel from "../../Models/category";
import duplicateKeyError from "../../Errors/duplicateKeyError";
import ICategory from "../../../types/models/Models/Category";

const createCategory = async (req: Request, res: Response) => {
  try {
    const category: ICategory | null = new CategoryModel({
      name: req.body.name,
      createdBy: req.auth!._id
    });

    await category.save();

    res.status(200).json({
      message: "Category Created!",
      category: req.body.name,
      _id: category._id,
      createdBy: category.createdBy
    });
  } catch (e) {
    duplicateKeyError(e, res);
    console.error(e);
  }
};

export default createCategory;
