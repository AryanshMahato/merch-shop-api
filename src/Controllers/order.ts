import { NextFunction, Request, Response } from "express";
import notFoundError from "../Errors/notFoundError";
import OrderModel from "../Models/order";
import internalServerError from "../Errors/internalServerError";
import unAuthorizedError from "../Errors/unAuthorized";
import { pushOrderInOrderList } from "./user";

const getOrderById = async (req: Request, res: Response) => {
  try {
    const order = await OrderModel.findById(req.params.orderId)
      .populate("user", "name _id")
      .populate("products", "_id name price")
      .select("_id products address amount transactionId user")
      .exec();
    //Checks if user asked for data is authorized or not
    // @ts-ignore
    if (order.user._id != req.auth._id) return unAuthorizedError(res);
    res.status(200).json({
      message: "Order Found!",
      order: order
    });
  } catch (e) {
    internalServerError(e, res);
  }
};

const createOrder = async (req: Request, res: Response) => {
  try {
    const order = new OrderModel({
      address: req.body.address,
      amount: req.body.amount,
      products: req.body.products,
      transactionId: req.body.transactionId,
      user: req.auth!._id
    });

    await pushOrderInOrderList(order, req.auth!._id);

    await order.save();

    res.status(200).json({
      message: "Order Created!",
      order: {
        id: order._id,
        // @ts-ignore
        amount: order.amount,
        // @ts-ignore
        products: order.products
      }
    });
  } catch (e) {
    res.status(200).json({
      order: req.body
    });
  }
};

const setOrderInRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { orderId } = req.params;
    if (!orderId) {
      return notFoundError("Order Id", res);
    }
    const order = await OrderModel.findById(orderId).exec();
    if (!order) {
      return notFoundError("Order", res);
    }
    req.order = order;
    next();
  } catch (e) {
    internalServerError(e, res);
  }
};

export { getOrderById, setOrderInRequest, createOrder };
