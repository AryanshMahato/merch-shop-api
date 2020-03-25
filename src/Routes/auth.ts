import { Router } from "express";
import { signOut, signUp } from "../Controllers/auth";
const authRoutes = Router();

authRoutes.post("/signup", signUp);

authRoutes.get("/signout", signOut);

export default authRoutes;
