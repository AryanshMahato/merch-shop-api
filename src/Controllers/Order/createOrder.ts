import { Request, Response } from "express";
import OrderModel from "../../Models/order";
import { pushOrderInOrderList } from "../User/HelperFunctions";
import IOrder from "../../../types/models/Models/Order";
import stripe from "../../util/stripe";
import CartModel from "../../Models/cart";
import ICart from "../../../types/models/Models/Cart";
import internalServerError from "../../Errors/internalServerError";

const makePayment = async (req: Request, res: Response) => {
  const { name, email, cart: cartId } = req.user;

  const cart: ICart | null = await CartModel.findById(cartId).exec();
  const products = cart?.products;

  if (!cart) {
    return internalServerError("No Cart Found", res);
  }
  let mPrice: number;

  products?.forEach(product => {
    // @ts-ignore
    mPrice += product?.price;
  });

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
    // @ts-ignore
    amount: mPrice,
    description: "My new Product",
    currency: "usd"
  });

  // @ts-ignore
  console.log(mPrice);
};

const createOrder = async (req: Request, res: Response) => {
  console.log(req.cart);
  // TODO: Update it with using DB for calculating amount
  try {
    // const response = makePayment(req, res);
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
  } catch (e) {
    res.status(200).json({
      order: req.body
    });
  }
};

export default createOrder;
