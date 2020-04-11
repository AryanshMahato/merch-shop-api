import { Router } from "express";
import sendValidationError from "../Errors/sendValidationError";
import { check } from "express-validator";
import { isSignedIn } from "../Controllers/Auth/HelperFunctions";
import getOrderById from "../Controllers/Order/getOrderById";
import createOrder from "../Controllers/Order/createOrder";
import { setOrderInRequest } from "../Controllers/Order/HelperFunctions";
import { setUserInRequest } from "../Controllers/User/HelperFunctions";

const orderRoutes = Router();

orderRoutes.get("/order/:orderId", isSignedIn, setOrderInRequest, getOrderById);

orderRoutes.post(
  "/order/create",
  [
    check("address", "Address is too short").isLength({
      min: 10
    }),
    check("amount", "Amount is invalid").isNumeric(),
    check("products", "Product is invalid").isArray(),
    check("transactionId", "Transaction Id is invalid").isString(),
    sendValidationError
  ],
  isSignedIn,
  setUserInRequest,
  createOrder
);

export default orderRoutes;
