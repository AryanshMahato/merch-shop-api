import { Router } from "express";
import { createProduct, getProductById } from "../Controllers/product";
import { isAdmin, isSignedIn } from "../Controllers/auth";

const productRoutes = Router();

productRoutes.get("/product/:id", getProductById);

productRoutes.post("/product/", isSignedIn, isAdmin, createProduct);

export default productRoutes;
