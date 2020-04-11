import { Request, Response } from "express";
import stripe from "../../util/stripe";
import { calcTotalPrice } from "../Products/HelperFunctions";
import internalServerError from "../../Errors/internalServerError";
import { pushOrderInOrderList } from "../User/HelperFunctions";
import IOrder from "../../../types/models/Models/Order";
import OrderModel from "../../Models/order";

const makePayment = async (req: Request, res: Response) => {
  try {
    const { name, email } = req.user;

    const totalPrice = calcTotalPrice(req.cart.products);

    const customer = await stripe.customers.create({
      name,
      email,
      source: "tok_mastercard",
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
      amount: totalPrice * 100,
      description: "My new Product",
      currency: "usd"
    });
  } catch (e) {
    internalServerError(e, res);
  }
};

const createOrder = async (req: Request, res: Response) => {
  console.log(req.cart);
  try {
    const response = await makePayment(req, res);
    if (!response) {
      throw new Error(response);
    }

    const order: IOrder | null = new OrderModel({
      amount: response.amount,
      products: req.cart.products,
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
        products: order.products
      }
    });

    res.status(200).json({ response });
  } catch (e) {
    res.status(200).json({
      order: req.body
    });
  }
};

export default createOrder;
