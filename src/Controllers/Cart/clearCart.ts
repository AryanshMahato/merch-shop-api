import { Request, Response } from "express";
import CartModel from "../../Models/cart";
import ICart from "../../../types/models/Models/Cart";
import notFoundError from "../../Errors/notFoundError";
import internalServerError from "../../Errors/internalServerError";

const clearCart = async (req: Request, res: Response) => {
  try {
    const cart: ICart | null = await CartModel.findById(req.user.cart).exec();
    if (!cart) {
      return notFoundError("Cart", res);
    }
    cart.products = [];

    await cart.save();

    res.status(200).json({
      message: "Cart Cleared"
    });
  } catch (e) {
    internalServerError(e, res);
  }
};

export default clearCart;
