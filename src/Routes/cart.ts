import { Router } from "express";
import { addToCart, getCart, removeFromCart } from "../Controllers/cart";
import { setProductInRequest } from "../Controllers/product";
import { setUserInRequest } from "../Controllers/user";
import { check } from "express-validator";
import sendValidationError from "../Errors/sendValidationError";
import { isSignedIn } from "../Controllers/Auth/HelperFunctions";

const cartRoutes = Router();

cartRoutes.get("/cart", isSignedIn, setUserInRequest, getCart);

cartRoutes.put(
  "/cart",
  [
    check("product", "Product ID is not valid").isLength({ min: 24, max: 24 }),
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
    check("product", "Product ID is not valid").isLength({ min: 24, max: 24 }),
    sendValidationError
  ],
  isSignedIn,
  setProductInRequest,
  setUserInRequest,
  removeFromCart
);

export default cartRoutes;
