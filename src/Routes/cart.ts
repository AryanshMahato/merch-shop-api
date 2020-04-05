import { Router } from "express";
import { setProductInRequest } from "../Controllers/product";
import { setUserInRequest } from "../Controllers/user";
import { check } from "express-validator";
import sendValidationError from "../Errors/sendValidationError";
import { isSignedIn } from "../Controllers/Auth/HelperFunctions";
import getCart from "../Controllers/Cart/getCart";
import addToCart from "../Controllers/Cart/addToCart";
import removeFromCart from "../Controllers/Cart/removeFromCart";

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
