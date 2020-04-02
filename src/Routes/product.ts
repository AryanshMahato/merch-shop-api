import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  getProductById,
  getProductImage,
  setProductImage,
  setProductInRequest,
  updateProduct
} from "../Controllers/product";
import { isAdmin, isSignedIn } from "../Controllers/auth";
import { setCategoryInRequest } from "../Controllers/category";
import { check } from "express-validator";
import sendValidationError from "../Errors/sendValidationError";

const productRoutes = Router();

productRoutes.get("/product/:id", getProductById);

//TODO: Add different route for all products
productRoutes.get("/products/:limit", getAllProduct);

productRoutes.post(
  "/product/",
  [
    check("name", "Name is too short").isLength({
      min: 3
    }),
    check("description", "Description is too shot").isLength({ min: 10 }),
    check("price", "Price is invalid").isNumeric(),
    check("category", "Category Id is invalid").isLength({ min: 24, max: 24 }),
    sendValidationError
  ],
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

productRoutes.post(
  "/product/image/:id",
  isSignedIn,
  isAdmin,
  setProductInRequest,
  setProductImage
);

productRoutes.get("/product/image/:id", setProductInRequest, getProductImage);

export default productRoutes;
