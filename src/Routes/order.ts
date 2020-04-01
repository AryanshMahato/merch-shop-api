import { Router } from "express";
import { isSignedIn } from "../Controllers/auth";
import {
  createOrder,
  getOrderById,
  setOrderInRequest
} from "../Controllers/order";
import sendValidationError from "../Errors/sendValidationError";
import { check } from "express-validator";

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
  createOrder
);

export default orderRoutes;
