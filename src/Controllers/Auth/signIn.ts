import { Request, Response } from "express";
import UserModel from "../../Models/user";
import notFoundError from "../../Errors/notFoundError";
import invalidCredentials from "../../Errors/invalidCredentials";
import jwt from "jsonwebtoken";
import internalServerError from "../../Errors/internalServerError";
import IUser from "../../../types/models/Models/User";

const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user: IUser | null = await UserModel.findOne({
      email: email
    }).populate("cart", "products count price user");

    if (!user) return notFoundError("User", res);

    // @ts-ignore
    if (!user?.authenticate(password)) return invalidCredentials(res);
    //? Above is ignored for reasons

    //create token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET!, {
      expiresIn: "7d"
    });

    // Send Response
    res.status(200).json({
      message: "User Authenticated",
      data: {
        _id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
        cart: user.cart,
        orders: user.orders
      },
      token
    });
  } catch (e) {
    internalServerError(e, res);
    throw new Error(e);
  }
};

export default signIn;
