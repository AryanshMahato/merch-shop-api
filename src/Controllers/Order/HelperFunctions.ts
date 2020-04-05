import { NextFunction, Request, Response } from "express";
import notFoundError from "../../Errors/notFoundError";
import OrderModel from "../../Models/order";
import internalServerError from "../../Errors/internalServerError";
import IOrder from "../../../types/models/Models/Order";

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

    const order: IOrder | null = await OrderModel.findById(orderId).exec();

    if (!order) {
      return notFoundError("Order", res);
    }

    req.order = order;
    next();
  } catch (e) {
    internalServerError(e, res);
  }
};

export { setOrderInRequest };
