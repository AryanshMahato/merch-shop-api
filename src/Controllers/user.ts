import { NextFunction, Request, Response } from "express";
import UserModel from "../Models/user";
import internalServerError from "../Errors/internalServerError";
import notFoundError from "../Errors/notFoundError";
import OrderModel from "../Models/order";
import OrderType from "../../types/models/OrderType";

const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await UserModel.findOne({ _id: req.params.id }).select(
      "_id role purchases name email"
    );
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
        id: user._id
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

const pushOrderInPurchaseList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let purchases: Array<any> = [];
  req.body.order.products.forEach((product: any) => {
    purchases.push({
      _id: product._id,
      name: product.name,
      description: product.description,
      category: product.category,
      quantity: product.quantity,
      amount: req.body.amount,
      transaction_id: req.body.transaction_id
    });
  });
  // Store Purchases in DB
  try {
    const user = await UserModel.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { purchases: purchases } },
      { new: true }
    ).exec();
    if (!!user) {
      return notFoundError("User(Update)", res);
    }
    next();
  } catch (e) {
    internalServerError(e, res);
    throw new Error(e);
  }
};

export {
  getUserById,
  updateUserById,
  userPurchaseList,
  pushOrderInPurchaseList
};
