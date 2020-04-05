import { Request, Response } from "express";
import CartModel from "../../Models/cart";
import internalServerError from "../../Errors/internalServerError";

const removeFromCart = async (req: Request, res: Response) => {
  const { product } = req;
  const cartId = req.user.cart;

  try {
    const cart = await CartModel.findById(cartId).exec();
    // @ts-ignore
    cart.products.pop(product);
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
