import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategory,
  getCategoryById,
  getCategoryMiddleware,
  updateCategory
} from "../Controllers/category";
import { isAdmin, isSignedIn } from "../Controllers/auth";

const categoryRoutes = Router();

//Create Category
categoryRoutes.post("/category/create/", isSignedIn, isAdmin, createCategory);

categoryRoutes.get("/category", isSignedIn, isAdmin, getAllCategory);

categoryRoutes.get("/category/:id", isSignedIn, isAdmin, getCategoryById);

categoryRoutes.put(
  "/category/:id",
  isSignedIn,
  isAdmin,
  getCategoryMiddleware,
  updateCategory
);

categoryRoutes.delete(
  "/category/:id",
  isSignedIn,
  isAdmin,
  getCategoryMiddleware,
  deleteCategory
);

export default categoryRoutes;
