import { Request, Response } from "express";
import CategoryModel from "../../Models/category";
import internalServerError from "../../Errors/internalServerError";

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

export default deleteCategory;
