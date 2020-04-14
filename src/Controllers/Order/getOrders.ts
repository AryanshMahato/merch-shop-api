import { Request, Response } from "express";
import OrderModel from "../../Models/order";
import IOrder from "../../../types/models/Models/Order";
import notFoundError from "../../Errors/notFoundError";
import internalServerError from "../../Errors/internalServerError";

const getOrders = async (req: Request, res: Response) => {
  try {
    const orders: Array<IOrder> = await OrderModel.find({
      user: req.auth?._id
    })
      .populate(
        "products",
        "name description price category stock sold imageName"
      )
      .exec();

    if (orders.length === 0) {
      return notFoundError("Orders", res);
    }

    const products = orders.map(order => order.products);

    // @ts-ignore
    const flattenProducts = products.flat();

    res.status(200).json({
      products: flattenProducts
    });
  } catch (e) {
    internalServerError(e, res);
  }
};

export { getOrders };
