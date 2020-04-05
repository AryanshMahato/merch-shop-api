import { Request, Response } from "express";
import CartModel from "../../Models/cart";
import internalServerError from "../../Errors/internalServerError";

const addToCart = async (req: Request, res: Response) => {
  const { product } = req;
  const cartId = req.user.cart;

  try {
    const cart = await CartModel.findByIdAndUpdate(
      cartId,
      {
        $push: { products: product._id }
      },
      { new: true }
    ).exec();

    res.json({
      message: "Product added to cart",
      cart
    });
  } catch (e) {
    internalServerError(e, res);
    throw new Error(e);
  }
};

export default addToCart;
