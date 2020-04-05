import { Request, Response } from "express";
import UserModel from "../../Models/user";
import notFoundError from "../../Errors/notFoundError";
import invalidCredentials from "../../Errors/invalidCredentials";
import jwt from "jsonwebtoken";
import internalServerError from "../../Errors/internalServerError";

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

export default signIn;
