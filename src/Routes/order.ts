import { Router } from "express";
import sendValidationError from "../Errors/sendValidationError";
import { check } from "express-validator";
import { isSignedIn } from "../Controllers/Auth/HelperFunctions";
import getOrderById from "../Controllers/Order/getOrderById";
import createOrder from "../Controllers/Order/createOrder";
import { setOrderInRequest } from "../Controllers/Order/HelperFunctions";
import { setUserInRequest } from "../Controllers/User/HelperFunctions";
import setCartInRequest from "../Controllers/Cart/HelperFunctions";
import { getOrders } from "../Controllers/Order/getOrders";
import buyNow from "../Controllers/Order/buyNow";
import { setProductInRequest } from "../Controllers/Products/HelperFunctions";

const orderRoutes = Router();

orderRoutes.get("/order/", isSignedIn, getOrders);

orderRoutes.get("/order/:orderId", isSignedIn, setOrderInRequest, getOrderById);

orderRoutes.post(
  "/order/create",
  [check("token", "Product is invalid"), sendValidationError],
  isSignedIn,
  setUserInRequest,
  setCartInRequest,
  createOrder
);

orderRoutes.post(
  "/order/buy-now/",
  [
    check("product", "Product is invalid"),
    check("token", "Token is invalid"),
    sendValidationError
  ],
  isSignedIn,
  setUserInRequest,
  setProductInRequest,
  buyNow
);

export default orderRoutes;
