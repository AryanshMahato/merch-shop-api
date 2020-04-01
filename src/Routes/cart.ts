import { Router } from "express";
import { isSignedIn } from "../Controllers/auth";
import { addToCart, getCart, removeFromCart } from "../Controllers/cart";
import { setProductInRequest } from "../Controllers/product";
import { setUserInRequest } from "../Controllers/user";
import { check } from "express-validator";
import sendValidationError from "../Errors/sendValidationError";

const cartRoutes = Router();

cartRoutes.get("/cart", isSignedIn, setUserInRequest, getCart);

cartRoutes.put(
  "/cart",
  [
    check("product", "Product is not provided in body").isEmpty(),
    sendValidationError
  ],
  isSignedIn,
  setProductInRequest,
  setUserInRequest,
  addToCart
);

cartRoutes.delete(
  "/cart",
  [
    check("product", "Product is not provided in body").isEmpty(),
    sendValidationError
  ],
  isSignedIn,
  setProductInRequest,
  setUserInRequest,
  removeFromCart
);

export default cartRoutes;
