import { Request, Response } from "express";
import UserModel from "../Models/user";
import internalServerError from "../Errors/internalServerError";
import notFoundError from "../Errors/notFoundError";

const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await UserModel.findOne({ _id: req.params.id }).select(
      "_id role purchases name email"
    );
    if (!user) {
      return notFoundError(res);
    }
    res.status(200).json({
      message: "User found!",
      user
    });
  } catch (e) {
    internalServerError(e, res);
  }
};

export { getUserById };
