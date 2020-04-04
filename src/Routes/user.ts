import { Router } from "express";
import {
  getUserById,
  updateUserById,
  userPurchaseList
} from "../Controllers/user";
import { isUser, isSignedIn } from "../Controllers/auth";
import { check } from "express-validator";

const userRoutes = Router();

userRoutes.get("/user/", isSignedIn, getUserById);

userRoutes.put(
  "/user/:id",
  check("name", "Name is too short").isLength({
    min: 3
  }),
  check("email", "Email is invalid").isEmail(),
  check("userInfo", "User Info is too short").isLength({ min: 10 }),
  isSignedIn,
  isUser,
  updateUserById
);

userRoutes.get("/orders/user/:id", isSignedIn, isUser, userPurchaseList);

export default userRoutes;
