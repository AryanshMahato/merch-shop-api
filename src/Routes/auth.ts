import { Request, Response, Router } from "express";
import { isSignedIn, signIn, signOut, signUp } from "../Controllers/auth";
import { check } from "express-validator";
import sendValidationError from "../Errors/sendValidationError";
const authRoutes = Router();

authRoutes.post(
  "/signup",
  [
    check("name", "Name is too shot").isLength({ min: 3 }),
    check("password", "Password is too short").isLength({ min: 6 }),
    check("email", "Email is invalid").isEmail(),
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

authRoutes.get("/test", isSignedIn, (req: Request, res: Response) => {
  res.status(200).json({
    message: "Protected Route"
  });
});

export default authRoutes;
