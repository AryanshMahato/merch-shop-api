import { Router } from "express";
import {
  getUserById,
  updateUserById,
  userPurchaseList
} from "../Controllers/user";
import { isUser, isSignedIn } from "../Controllers/auth";

const userRoutes = Router();

userRoutes.get("/user/:id", isSignedIn, isUser, getUserById);

userRoutes.put("/user/:id", isSignedIn, isUser, updateUserById);

userRoutes.get(
  "/orders/user/:id",
  isSignedIn,
  isUser,
  userPurchaseList
);

export default userRoutes;
