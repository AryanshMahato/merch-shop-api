import { Request, Response } from "express";
import stripe from "../../util/stripe";
import { calcTotalPrice } from "../Products/HelperFunctions";
import internalServerError from "../../Errors/internalServerError";

const makePayment = async (req: Request, res: Response) => {
  try {
    const { name, email } = req.user;

    const totalPrice = calcTotalPrice(req.cart.products);

    const customer = await stripe.customers.create({
      name,
      email,
      source: "tok_mastercard",
      address: {
        line1: "510 Townsend St",
        postal_code: "98140",
        city: "San Francisco",
        state: "CA",
        country: "US"
      }
    });

    const response = await stripe.charges.create({
      customer: customer.id,
      amount: totalPrice,
      description: "My new Product",
      currency: "usd"
    });

    console.log(response);
  } catch (e) {
    internalServerError(e, res);
  }
};

const createOrder = async (req: Request, res: Response) => {
  console.log(req.cart);
  // TODO: Update it with using DB for calculating amount
  try {
    const response = makePayment(req, res);
    // const order: IOrder | null = new OrderModel({
    //   address: req.body.address,
    //   amount: req.body.amount,
    //   products: req.body.products,
    //   transactionId: req.body.transactionId,
    //   user: req.auth!._id
    // });
    // await pushOrderInOrderList(order, req.auth!._id);
    //
    // await order.save();
    // res.status(200).json({
    //   message: "Order Created!",
    //   order: {
    //     _id: order._id,
    //     amount: order.amount,
    //     products: order.products
    //   }
    // });
    res.status(200).json({ response });
  } catch (e) {
    res.status(200).json({
      order: req.body
    });
  }
};

export default createOrder;
