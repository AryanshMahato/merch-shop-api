import { Router } from "express";
import { createCategory } from "../Controllers/category";
import { isAdmin,  isSignedIn } from "../Controllers/auth";

const categoryRoutes = Router();

//Create Category
categoryRoutes.post(
  "/category/create/",
  isSignedIn,
  isAdmin,
  createCategory
);

// categoryRoutes.get(
//   "/category/create/:id",
//   isSignedIn,
//   isAdmin,
//   getAllCategory
// );

export default categoryRoutes;
