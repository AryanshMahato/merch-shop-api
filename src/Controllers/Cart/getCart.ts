import { Request, Response } from "express";
import CartModel from "../../Models/cart";

const getCart = async (req: Request, res: Response) => {
  const cartId = req.user.cart;
  const cart = await CartModel.findById(cartId)
    .populate("user", "_id name email cart role")
    .exec();
  res.json({
    cart
  });
};

export default getCart;
