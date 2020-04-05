import { Request, Response } from "express";
import UserModel from "../../Models/user";
import notFoundError from "../../Errors/notFoundError";
import internalServerError from "../../Errors/internalServerError";

const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await UserModel.findOne({ _id: req.auth?._id })
      .populate("orders", "_id amount")
      .select("_id role purchases name email");
    if (!user) {
      return notFoundError("User", res);
    }
    res.status(200).json({
      message: "User found!",
      user
    });
  } catch (e) {
    internalServerError(e, res);
  }
};

export default getUserById;
