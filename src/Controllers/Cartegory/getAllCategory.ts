import { Request, Response } from "express";
import CategoryModel from "../../Models/category";
import notFoundError from "../../Errors/notFoundError";
import internalServerError from "../../Errors/internalServerError";
import ICategory from "../../../types/models/Models/Category";

const getAllCategory = async (req: Request, res: Response) => {
  try {
    const categories: Array<ICategory> = await CategoryModel.find()
      .select("_id name createdBy")
      .exec();

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
