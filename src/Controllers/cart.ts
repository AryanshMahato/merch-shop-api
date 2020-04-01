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
    const cart = await CartModel.findByIdAndUpdate(cartId, {
      $push: { products: product._id }
    }).exec();

    res.json({
      message: "Product added to cart",
      cart
    });
  } catch (e) {
    internalServerError(e, res);
    throw new Error(e);
  }
};

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

export { getCart, addToCart, removeFromCart };
