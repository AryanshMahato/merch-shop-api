import { NextFunction, Request, Response } from "express";
import CategoryModel from "../../Models/category";
import notFoundError from "../../Errors/notFoundError";
import internalServerError from "../../Errors/internalServerError";
import ICategory from "../../../types/models/Models/Category";

// Sets value of req.category or throws error
const setCategoryInRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Sets id to params.id if body.category not found!
    const id = req.body.category || req.params.id;

    if (!id) {
      return res.status(400).json({
        message: "No Category Id found"
      });
    }

    const category: ICategory | null = await CategoryModel.findById(id)
      .select("name _id createdBy")
      .exec();

    if (!category) {
      return notFoundError("Category", res);
    }

    req.category = category;
    next();
  } catch (e) {
    internalServerError(e, res);
  }
};

export { setCategoryInRequest };
