import { Router } from "express";
import { isSignedIn } from "../Controllers/auth";
import {
  createOrder,
  getOrderById,
  setOrderInRequest
} from "../Controllers/order";

const orderRoutes = Router();

orderRoutes.get("/order/:orderId", isSignedIn, setOrderInRequest, getOrderById);

orderRoutes.post("/order/create", isSignedIn, createOrder);

export default orderRoutes;
