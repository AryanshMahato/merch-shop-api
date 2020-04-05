import { Request, Response } from "express";
import CategoryModel from "../../Models/category";
import notFoundError from "../../Errors/notFoundError";
import internalServerError from "../../Errors/internalServerError";
import ICategory from "../../../types/models/Models/Category";

const getCategoryById = async (req: Request, res: Response) => {
  try {
    const category: ICategory | null = await CategoryModel.findById(
      req.params.id
    )
      .select("name _id createdBy")
      .exec();

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
