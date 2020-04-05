import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  getProductById,
  setProductInRequest,
  updateProduct
} from "../Controllers/product";
import { isAdmin, isSignedIn } from "../Controllers/auth";
import { setCategoryInRequest } from "../Controllers/category";
import { check } from "express-validator";
import sendValidationError from "../Errors/sendValidationError";
import mMulter from "../util/mMulter";

//! Root Directory must have an uploads folder

const productRoutes = Router();
productRoutes.get("/product/:id", getProductById);

//TODO: Add different route for all products
productRoutes.get("/products/:limit", getAllProduct);

productRoutes.post(
  "/product/",
  mMulter.single("image"),
  isSignedIn,
  isAdmin,
  setCategoryInRequest,
  createProduct
);

productRoutes.put(
  "/product/:id",
  [
    check("name", "Name is too short")
      .isLength({
        min: 3
      })
      .optional(),
    check("description", "Description is too shot")
      .isLength({ min: 10 })
      .optional(),
    check("price", "Price is invalid")
      .isNumeric()
      .optional(),
    check("category", "Category Id is invalid")
      .isLength({ min: 24, max: 24 })
      .optional(),
    sendValidationError
  ],
  isSignedIn,
  isAdmin,
  setProductInRequest,
  updateProduct
);

productRoutes.delete("/product/:id", isSignedIn, isAdmin, deleteProduct);

export default productRoutes;
