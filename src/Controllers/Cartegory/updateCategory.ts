import { Request, Response } from "express";
import CategoryModel from "../../Models/category";
import internalServerError from "../../Errors/internalServerError";
import ICategory from "../../../types/models/Models/Category";

const updateCategory = async (req: Request, res: Response) => {
  try {
    const category: ICategory | null = await CategoryModel.findByIdAndUpdate(
      req.category._id,
      {
        $set: { ...req.body }
      },
      { new: true }
    )
      .select("name _id createdBy")
      .exec();

    res.status(200).json({
      message: "Category Updated",
      category: { ...category }
    });
  } catch (e) {
    internalServerError(e, res);
    throw new Error(e);
  }
};

export default updateCategory;
