import { Router } from "express";
import { isSignedIn } from "../Controllers/auth";
import { addToCart, getCart } from "../Controllers/cart";
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

export default cartRoutes;
