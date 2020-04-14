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

export default orderRoutes;
