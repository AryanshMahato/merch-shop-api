// Methods
import expressJwt from "express-jwt";
import { NextFunction, Request, Response } from "express";
import UserModel from "../../Models/user";
import notFoundError from "../../Errors/notFoundError";
import unAuthorizedError from "../../Errors/unAuthorized";
import internalServerError from "../../Errors/internalServerError";
import IUser from "../../../types/models/Models/User";

const isSignedIn = expressJwt({
  secret: process.env.JWT_SECRET!,
  userProperty: "auth"
});

const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user: IUser | null = await UserModel.findById(req.auth!._id).exec();

    if (!user) {
      return notFoundError("User", res);
    }

    if (user.role !== 1) {
      return unAuthorizedError(res);
    }

    next();
  } catch (e) {
    internalServerError(e, res);
  }
};

export { isAdmin, isSignedIn };
