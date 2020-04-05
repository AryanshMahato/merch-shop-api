import { Request, Response } from "express";
import OrderModel from "../../Models/order";
import notFoundError from "../../Errors/notFoundError";
import internalServerError from "../../Errors/internalServerError";

const getUserPurchaseList = async (req: Request, res: Response) => {
  try {
    const order = await OrderModel.find({ user: req.auth?._id })
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

export default getUserPurchaseList;
