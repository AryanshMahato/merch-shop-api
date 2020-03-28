import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProductById,
  setProductInRequest,
  updateProduct
} from "../Controllers/product";
import { isAdmin, isSignedIn } from "../Controllers/auth";
import { setCategoryInRequest } from "../Controllers/category";

const productRoutes = Router();

productRoutes.get("/product/:id", getProductById);

productRoutes.post(
  "/product/",
  isSignedIn,
  isAdmin,
  setCategoryInRequest,
  createProduct
);

productRoutes.put(
  "/product/:id",
  isSignedIn,
  isAdmin,
  setProductInRequest,
  updateProduct
);

productRoutes.delete("/product/:id", isSignedIn, isAdmin, deleteProduct);

export default productRoutes;
