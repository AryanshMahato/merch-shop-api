import { Router } from "express";
import { getUserById } from "../Controllers/user";
import { isSignedIn } from "../Controllers/auth";

const userRoutes = Router();

userRoutes.get("/user/:id", isSignedIn, getUserById);

export default userRoutes;
