import { Request, Response } from "express";
import internalServerError from "../../Errors/internalServerError";
import IOrder from "../../../types/models/Models/Order";
import OrderModel from "../../Models/order";
import { pushOrderInOrderList } from "../User/HelperFunctions";
import stripe from "../../util/stripe";

const makePayment = async (req: Request) => {
  const { name, email } = req.user;

  const customer = await stripe.customers.create({
    name,
    email,
    source: req.body.token,
    address: {
      line1: "We Don't need it",
      postal_code: "713338",
      city: "We Don't need it",
      state: "CA",
      country: "US"
    }
  });

  return stripe.charges.create({
    customer: customer.id,
    amount: req.product.price * 100,
    description: "My new Product",
    currency: "usd"
  });
};

const buyNow = async (req: Request, res: Response) => {
  try {
    const response = await makePayment(req);
    if (!response) {
      return internalServerError(response, res);
    }

    const order: IOrder | null = new OrderModel({
      amount: response.amount / 100,
      products: req.product._id,
      transactionId: response.id,
      user: req.user
    });

    await pushOrderInOrderList(order, req.auth!._id);

    await order.save();

    res.status(200).json({
      message: "Order Created!",
      order: {
        _id: order._id,
        amount: order.amount,
        product: order.products
      }
    });
  } catch (e) {
    internalServerError(e, res);
  }
};

export default buyNow;
