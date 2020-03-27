import { Router } from "express";
import {
  createCategory,
  getAllCategory,
  getCategoryById
} from "../Controllers/category";
import { isAdmin, isSignedIn } from "../Controllers/auth";

const categoryRoutes = Router();

//Create Category
categoryRoutes.post("/category/create/", isSignedIn, isAdmin, createCategory);

categoryRoutes.get("/category", isSignedIn, isAdmin, getAllCategory);

categoryRoutes.get("/category/:id", isSignedIn, isAdmin, getCategoryById);

export default categoryRoutes;
