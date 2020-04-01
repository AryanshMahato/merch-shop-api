import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import UserModel from "../Models/user";
import expressJwt from "express-jwt";
import notFoundError from "../Errors/notFoundError";
import invalidCredentials from "../Errors/invalidCredentials";
import internalServerError from "../Errors/internalServerError";
import unAuthorizedError from "../Errors/unAuthorized";
import CartModel from "../Models/cart";


const createCart = async (userData: UserModel) => {
  const cart = new CartModel({ user: userData._id });
  return await cart.save();
};

const signUp = async (req: Request, res: Response) => {
  const user = new UserModel(req.body);
  try {
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
      data: { id: userData._id, name: userData.name, email: user.email },
      token
    });
  } catch (err) {
    res.json({ error: err });
  }
};

const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email: email });
    if (!user) return notFoundError("User", res);
    // @ts-ignore
    if (!user.authenticate(password)) return invalidCredentials(res);

    //create token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET!, {
      expiresIn: "7d"
    });

    // Send Response
    res.status(200).json({
      message: "User Authenticated",
      // @ts-ignore
      data: { _id: user._id, email: user.email, name: user.name },
      token
    });
  } catch (e) {
    internalServerError(e, res);
    throw new Error(e);
  }
};

const signOut = (req: Request, res: Response) => {
  res.status(200).json({
    message: "SignOut Successful"
  });
};

// Methods
const isSignedIn = expressJwt({
  secret: process.env.JWT_SECRET!,
  userProperty: "auth"
});

// No need to add isUser while using isAdmin
const isUser = (req: Request, res: Response, next: NextFunction) => {
  // Returns true if all checks are true
  const check =
    req.auth &&
    (req.auth._id === req.body.id || req.auth._id === req.params.id);
  if (!check) {
    return unAuthorizedError(res);
  }
  next();
};

const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await UserModel.findById(req.auth!._id).exec();
    if (!user) {
      return notFoundError("User", res);
    }
    // @ts-ignore
    if (user.role !== 1) {
      return unAuthorizedError(res);
    }
    next();
  } catch (e) {
    internalServerError(e, res);
  }
};

export { signOut, signUp, signIn, isSignedIn, isAdmin, isUser };
