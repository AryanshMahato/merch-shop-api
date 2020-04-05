import { Request, Response } from "express";
import UserModel from "../../Models/user";
import jwt from "jsonwebtoken";
import CartModel from "../../Models/cart";

const createCart = async (userData: UserModel) => {
  const cart = new CartModel({ user: userData._id });
  return await cart.save();
};

const signUp = async (req: Request, res: Response) => {
  const user = new UserModel(req.body);
  try {
    // userData is used to later update it's cart
    let userData = await user.save();
    //create token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET!, {
      expiresIn: "7d"
    });

    // Creates Cart
    // @ts-ignore
    user.cart = await createCart(user);

    userData = await user.save();

    res.status(200).json({
      message: "User Created",
      // @ts-ignore
      data: { _id: userData._id, name: userData.name, email: user.email },
      token
    });
  } catch (err) {
    res.json({ error: err });
  }
};

export default signUp;
