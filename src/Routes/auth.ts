import { Router } from "express";
import { check } from "express-validator";
import sendValidationError from "../Errors/sendValidationError";
import signUp from "../Controllers/Auth/signUp";
import signIn from "../Controllers/Auth/signIn";
import signOut from "../Controllers/Auth/signOut";
const authRoutes = Router();

authRoutes.post(
  "/signup",
  [
    check("name", "Name is too short").isLength({ min: 3 }),
    check("password", "Password is too short").isLength({ min: 6 }),
    check("email", "Email is invalid").isEmail(),
    check("userInfo", "User Info is too short")
      .isLength({ min: 10 })
      .optional(),
    sendValidationError
  ],
  signUp
);

authRoutes.post(
  "/signin",
  [
    check("password", "Password is too short").isLength({ min: 6 }),
    check("email", "Email is invalid").isEmail(),
    sendValidationError
  ],
  signIn
);

authRoutes.get("/signout", signOut);

export default authRoutes;
