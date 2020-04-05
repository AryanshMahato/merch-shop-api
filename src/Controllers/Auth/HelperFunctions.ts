// Methods
import expressJwt from "express-jwt";
import { NextFunction, Request, Response } from "express";
import UserModel from "../../Models/user";
import notFoundError from "../../Errors/notFoundError";
import unAuthorizedError from "../../Errors/unAuthorized";
import internalServerError from "../../Errors/internalServerError";

const isSignedIn = expressJwt({
  secret: process.env.JWT_SECRET!,
  userProperty: "auth"
});

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

export { isAdmin, isSignedIn };
