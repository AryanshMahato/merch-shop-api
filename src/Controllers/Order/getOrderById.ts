import { Request, Response } from "express";
import OrderModel from "../../Models/order";
import unAuthorizedError from "../../Errors/unAuthorized";
import internalServerError from "../../Errors/internalServerError";
import IOrder from "../../../types/models/Models/Order";

const getOrderById = async (req: Request, res: Response) => {
  try {
    const order: IOrder | null = await OrderModel.findById(req.params.orderId)
      .populate("user", "name _id")
      .populate("products", "_id name price")
      .select("_id products address amount transactionId user")
      .exec();

    //Checks if user asked for data is authorized or not
    // @ts-ignore
    if (order?.user?._id != req.auth?._id) return unAuthorizedError(res);

    res.status(200).json({
      message: "Order Found!",
      order: order
    });
  } catch (e) {
    internalServerError(e, res);
  }
};

export default getOrderById;
