import { Router } from "express";
import { getUserById } from "../Controllers/user";
import {isAuthenticated, isSignedIn} from "../Controllers/auth";

const userRoutes = Router();

userRoutes.get("/user/:id", isSignedIn, isAuthenticated, getUserById);

export default userRoutes;
