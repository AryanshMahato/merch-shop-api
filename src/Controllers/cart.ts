import { Request, Response } from "express";
import CartModel from "../Models/Cart";
import internalServerError from "../Errors/internalServerError";

const getCart = async (req: Request, res: Response) => {
  const cartId = req.user.cart;
  const cart = await CartModel.findById(cartId)
    .populate("user", "_id name email cart role")
    .exec();
  res.json({
    cart
  });
};

const addToCart = async (req: Request, res: Response) => {
  const { product } = req;
  const cartId = req.user.cart;

  try {
    await CartModel.findByIdAndUpdate(cartId, {
      $push: { products: product._id }
    });

    res.json({
      message: "Cart Updated"
    });
  } catch (e) {
    internalServerError(e, res);
    throw new Error(e);
  }
};

export { getCart, addToCart };
