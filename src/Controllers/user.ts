import { NextFunction, Request, Response } from "express";
import UserModel from "../Models/user";
import internalServerError from "../Errors/internalServerError";
import notFoundError from "../Errors/notFoundError";
import OrderModel from "../Models/order";

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

const updateUserById = async (req: Request, res: Response) => {
  try {
    let user = await UserModel.findById(req.params.id).exec();
    if (!user) {
      return notFoundError("User", res);
    }
    // @ts-ignore
    user.name = req.body.name || user.name;
    // @ts-ignore
    user.email = req.body.email || user.email;
    await user!.save();
    res.status(200).json({
      message: "User Updated",
      data: {
        // @ts-ignore
        name: user.name,
        // @ts-ignore
        email: user.email,
        _id: user._id
      }
    });
  } catch (e) {
    internalServerError(e, res);
  }
};

const userPurchaseList = async (req: Request, res: Response) => {
  try {
    const order = await OrderModel.find({ user: req.params.id })
      .populate("user", "_id name")
      .exec();
    if (!order.length) {
      return notFoundError("Order", res);
    }
    res.status(200).json({
      message: "Order Found!",
      orders: order
    });
  } catch (e) {
    internalServerError(e, res);
  }
};

// Adds Order in User Order List
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
  const user = await UserModel.findById(req.auth?._id)
    .select("_id name email cart role")
    .exec();
  if (!user) {
    return notFoundError("User", res);
  }
  req.user = user;
  next();
};

export {
  getUserById,
  updateUserById,
  userPurchaseList,
  pushOrderInOrderList,
  setUserInRequest
};
