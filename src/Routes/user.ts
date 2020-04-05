import { Router } from "express";
import { check } from "express-validator";
import { isSignedIn } from "../Controllers/Auth/HelperFunctions";
import getUserById from "../Controllers/User/getUserById";
import updateUserById from "../Controllers/User/updateUserById";
import getUserPurchaseList from "../Controllers/User/getUserPurchaseList";

const userRoutes = Router();

userRoutes.get("/user/", isSignedIn, getUserById);

userRoutes.put(
  "/user/",
  check("name", "Name is too short").isLength({
    min: 3
  }),
  check("email", "Email is invalid").isEmail(),
  check("userInfo", "User Info is too short").isLength({ min: 10 }),
  isSignedIn,
  updateUserById
);

userRoutes.get("/orders/user/", isSignedIn, getUserPurchaseList);

export default userRoutes;
