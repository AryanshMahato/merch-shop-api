import { Request, Response } from "express";
import UserModel from "../../Models/user";
import notFoundError from "../../Errors/notFoundError";
import internalServerError from "../../Errors/internalServerError";

const updateUserById = async (req: Request, res: Response) => {
  try {
    let user = await UserModel.findById(req.auth?._id).exec();
    if (!user) {
      return notFoundError("User", res);
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
        _id: user._id
      }
    });
  } catch (e) {
    internalServerError(e, res);
  }
};

export default updateUserById;
