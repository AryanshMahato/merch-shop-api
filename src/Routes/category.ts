import { Router } from "express";
import { check } from "express-validator";
import sendValidationError from "../Errors/sendValidationError";
import { isAdmin, isSignedIn } from "../Controllers/Auth/HelperFunctions";
import createCategory from "../Controllers/Cartegory/createCategory";
import getAllCategory from "../Controllers/Cartegory/getAllCategory";
import getCategoryById from "../Controllers/Cartegory/getCartegoryById";
import updateCategory from "../Controllers/Cartegory/updateCategory";
import deleteCategory from "../Controllers/Cartegory/deleteCategory";
import { setCategoryInRequest } from "../Controllers/Cartegory/HelperFunctions";

const categoryRoutes = Router();

//Create Category
categoryRoutes.post(
  "/category/create/",
  [
    check("name", "Name is too short, should be at least 4 char").isLength({
      min: 3
    }),
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
  [
    check("name", "Name is too short, should be at least 4 char").isLength({
      min: 3
    }),
    sendValidationError
  ],
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
