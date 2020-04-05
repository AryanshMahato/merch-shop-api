import { Request, Response } from "express";
import OrderModel from "../../Models/order";
import { pushOrderInOrderList } from "../user";

const createOrder = async (req: Request, res: Response) => {
  // TODO: Update it with using DB for calculating amount
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
        _id: order._id,
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

export default createOrder;
