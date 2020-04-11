import { NextFunction, Request, Response } from "express";
import CartModel from "../../Models/cart";

const setCartInRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const cartId = req.user.cart;
  req.cart = await CartModel.findById(cartId)
    .populate("user", "_id name email cart role")
    .populate({
      path: "products",
      select: "_id name description price category imageName",
      populate: {
        path: "category",
        select: "_id name"
      }
    })
    .exec();
  next();
};

export default setCartInRequest;
