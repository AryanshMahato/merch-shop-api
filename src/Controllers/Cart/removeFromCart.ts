import { Request, Response } from "express";
import CartModel from "../../Models/cart";
import internalServerError from "../../Errors/internalServerError";
import ICart from "../../../types/models/Models/Cart";

const removeFromCart = async (req: Request, res: Response) => {
  const { product } = req;
  const cartId = req.user.cart;

  try {
    const cart: ICart | null = await CartModel.findById(cartId).exec();

    cart?.products?.splice(cart?.products?.indexOf(product), 1);

    await cart?.save();

    res.json({
      message: "Product removed from cart",
      cart
    });
  } catch (e) {
    internalServerError(e, res);
    throw new Error(e);
  }
};

export default removeFromCart;
