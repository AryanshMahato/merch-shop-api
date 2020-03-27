import { Router } from "express";
import { createCategory } from "../Controllers/category";
import { isAdmin, isAuthenticated, isSignedIn } from "../Controllers/auth";

const categoryRoutes = Router();

//Create Category
categoryRoutes.post(
  "/category/create/:id",
  isSignedIn,
  isAuthenticated,
  isAdmin,
  createCategory
);

export default categoryRoutes;
