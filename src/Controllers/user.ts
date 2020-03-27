import { Request, Response } from "express";
import UserModel from "../Models/user";
import internalServerError from "../Errors/internalServerError";
import notFoundError from "../Errors/notFoundError";

const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await UserModel.findOne({ _id: req.params.id }).select(
      "_id role purchases name email"
    );
    if (!user) {
      return notFoundError(res);
    }
    res.status(200).json({
      message: "User found!",
      user
    });
  } catch (e) {
    internalServerError(e, res);
  }
};

const updateUserById = async (req: Request, res: Response) => {
  try {
    let user = await UserModel.findById(req.params.id).exec();
    if (!user) {
      return notFoundError(res);
    }
    // @ts-ignore
    user.name = req.body.name || user.name;
    // @ts-ignore
    user.email = req.body.email || user.email;
    await user!.save();
    res.status(200).json({
      message: "User Updated",
      data: {
        // @ts-ignore
        name: user.name,
        // @ts-ignore
        email: user.email,
        id: user._id
      }
    });
  } catch (e) {
    internalServerError(e, res);
  }
};

export { getUserById, updateUserById };
