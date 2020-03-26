import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import UserModel from "../Models/user";
import expressJwt from "express-jwt";
import notFoundError from "../Errors/notFoundError";
import invalidCredentials from "../Errors/invalidCredentials";
import internalServerError from "../Errors/internalServerError";
import unAuthorizedError from "../Errors/unAuthorized";

const signUp = async (req: Request, res: Response) => {
  const user = new UserModel(req.body);
  try {
    const userData = await user.save();
    res.status(200).json({
      message: "User Created",
      data: { id: userData._id, name: userData.name, email: user.email }
    });
  } catch (err) {
    res.json({ error: err });
  }
};

const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email: email });
    if (!user) return notFoundError(res);
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

const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.body.profile !== 1) {
    unAuthorizedError(res);
  }
  next();
};

export { signOut, signUp, signIn, isSignedIn, isAdmin };
