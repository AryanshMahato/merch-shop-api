import { Router } from "express";
import {getUserById, updateUserById} from "../Controllers/user";
import { isAuthenticated, isSignedIn } from "../Controllers/auth";

const userRoutes = Router();

userRoutes.get("/user/:id", isSignedIn, isAuthenticated, getUserById);

userRoutes.put("/user/:id", isSignedIn, isAuthenticated, updateUserById);

export default userRoutes;
