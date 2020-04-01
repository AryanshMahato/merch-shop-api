import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategory,
  getCategoryById,
  setCategoryInRequest,
  updateCategory
} from "../Controllers/category";
import { isAdmin, isSignedIn } from "../Controllers/auth";
import { check } from "express-validator";
import sendValidationError from "../Errors/sendValidationError";

const categoryRoutes = Router();

//Create Category
categoryRoutes.post(
  "/category/create/",
  [
    check("name", "Name is not provided in body").isEmpty(),
    sendValidationError
  ],
  isSignedIn,
  isAdmin,
  createCategory
);

categoryRoutes.get("/category", isSignedIn, isAdmin, getAllCategory);

categoryRoutes.get("/category/:id", isSignedIn, isAdmin, getCategoryById);

categoryRoutes.put(
  "/category/:id",
  isSignedIn,
  isAdmin,
  setCategoryInRequest,
  updateCategory
);

categoryRoutes.delete(
  "/category/:id",
  isSignedIn,
  isAdmin,
  setCategoryInRequest,
  deleteCategory
);

export default categoryRoutes;
