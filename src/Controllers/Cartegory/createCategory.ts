import { Request, Response } from "express";
import CategoryModel from "../../Models/category";
import duplicateKeyError from "../../Errors/duplicateKeyError";

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
      _id: category._id,
      // @ts-ignore
      createdBy: category.createdBy
    });
  } catch (e) {
    duplicateKeyError(e, res);
    console.error(e);
  }
};

export default createCategory;
