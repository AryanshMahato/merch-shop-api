import { Request, Response } from "express";
import CategoryModel from "../../Models/category";
import notFoundError from "../../Errors/notFoundError";
import internalServerError from "../../Errors/internalServerError";

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

export default getAllCategory;
