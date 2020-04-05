// Adds Order in User Order List
import UserModel from "../../Models/user";
import { NextFunction, Request, Response } from "express";
import notFoundError from "../../Errors/notFoundError";
import IUser from "../../../types/models/Models/User";

const pushOrderInOrderList = async (order: any, userId: string) => {
  try {
    await UserModel.findByIdAndUpdate(
      { _id: userId },
      { $push: { orders: order } }
    );
  } catch (e) {
    throw new Error(e);
  }
};

const setUserInRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user: IUser | null = await UserModel.findById(req.auth?._id)
    .select("_id name email cart role orders")
    .exec();

  if (!user) {
    return notFoundError("User", res);
  }

  req.user = user;
  next();
};

export { pushOrderInOrderList, setUserInRequest };
