import { Router } from "express";
import {
  createProduct,
  getProductById,
  updateProduct
} from "../Controllers/product";
import { isAdmin, isSignedIn } from "../Controllers/auth";

const productRoutes = Router();

productRoutes.get("/product/:id", getProductById);

productRoutes.post("/product/", isSignedIn, isAdmin, createProduct);

productRoutes.put("/product/:id", isSignedIn, isAdmin, updateProduct);

export default productRoutes;
