import { Router } from "express";
import { signOut, signUp } from "../Controllers/auth";
import { check } from "express-validator";
const authRoutes = Router();

authRoutes.post(
  "/signup",
  [
    check("email", "Name is too shot").isLength({ min: 3 }),
    check("password", "Password is too short").isLength({ min: 6 }),
    check("email", "Email is invalid").isEmail()
  ],
  signUp
);

authRoutes.get("/signout", signOut);

export default authRoutes;
