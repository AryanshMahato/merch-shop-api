import { Request, Response } from "express";
import UserModel from "../Models/user";

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

const signOut = (req: Request, res: Response) => {
  res.status(200).json({
    message: "SignOut Successful"
  });
};

export { signOut, signUp, signIn };
