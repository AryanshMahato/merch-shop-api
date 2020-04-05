import { Request, Response } from "express";
import CategoryModel from "../../Models/category";
import notFoundError from "../../Errors/notFoundError";
import internalServerError from "../../Errors/internalServerError";

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

export default getCategoryById;
