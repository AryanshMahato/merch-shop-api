import { NextFunction, Request, Response } from "express";
import CartModel from "../../Models/cart";
import ICart from "../../../types/models/Models/Cart";

const setCartInRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const cartId = req.user.cart;
  const cart: ICart | null = await CartModel.findById(cartId)
    .populate("user", "_id name email cart role")
    .populate({
      path: "products",
      select: "_id name description price category",
      populate: {
        path: "category",
        select: "_id name"
      }
    })
    .exec();

  req.cart = cart;
  next();
};

export default setCartInRequest;
