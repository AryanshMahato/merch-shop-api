import { Request, Response } from "express";
import OrderModel from "../../Models/order";
import { pushOrderInOrderList } from "../User/HelperFunctions";
import IOrder from "../../../types/models/Models/Order";

const createOrder = async (req: Request, res: Response) => {
  // TODO: Update it with using DB for calculating amount
  try {
    const order: IOrder | null = new OrderModel({
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
        _id: order._id,
        amount: order.amount,
        products: order.products
      }
    });
  } catch (e) {
    res.status(200).json({
      order: req.body
    });
  }
};

export default createOrder;
