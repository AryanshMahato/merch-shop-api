import { Router } from "express";
import {
  getUserById,
  updateUserById,
  userPurchaseList
} from "../Controllers/user";
import { isAuthenticated, isSignedIn } from "../Controllers/auth";

const userRoutes = Router();

userRoutes.get("/user/:id", isSignedIn, isAuthenticated, getUserById);

userRoutes.put("/user/:id", isSignedIn, isAuthenticated, updateUserById);

userRoutes.get(
  "/orders/user/:id",
  isSignedIn,
  isAuthenticated,
  userPurchaseList
);

export default userRoutes;
