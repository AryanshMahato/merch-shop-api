import { Request, Response } from "express";
import UserModel from "../../Models/user";
import notFoundError from "../../Errors/notFoundError";
import internalServerError from "../../Errors/internalServerError";
import IUser from "../../../types/models/Models/User";

const updateUserById = async (req: Request, res: Response) => {
  try {
    let user: IUser | null = await UserModel.findById(req.auth?._id).exec();

    if (!user) {
      return notFoundError("User", res);
    }

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    await user!.save();
    res.status(200).json({
      message: "User Updated",
      data: {
        name: user.name,
        email: user.email,
        _id: user._id
      }
    });
  } catch (e) {
    internalServerError(e, res);
  }
};

export default updateUserById;
