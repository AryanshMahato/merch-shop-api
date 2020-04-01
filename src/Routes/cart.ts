import { Router } from "express";
import { isSignedIn } from "../Controllers/auth";
import { addToCart, getCart, removeFromCart } from "../Controllers/cart";
import { setProductInRequest } from "../Controllers/product";
import { setUserInRequest } from "../Controllers/user";

const cartRoutes = Router();

cartRoutes.get("/cart", isSignedIn, setUserInRequest, getCart);

cartRoutes.put(
  "/cart",
  isSignedIn,
  setProductInRequest,
  setUserInRequest,
  addToCart
);

cartRoutes.delete(
  "/cart",
  isSignedIn,
  setProductInRequest,
  setUserInRequest,
  removeFromCart
);

export default cartRoutes;
