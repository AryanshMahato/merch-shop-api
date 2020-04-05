import { Request, Response } from "express";
import CategoryModel from "../../Models/category";
import internalServerError from "../../Errors/internalServerError";

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

export default updateCategory;
