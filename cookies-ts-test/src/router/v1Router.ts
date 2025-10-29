import productsRouter from "../resources/products/products.router.js";
import { Router } from "express";

const router = Router();

router.use(
  "/products",
  // #swagger.tags = ['Products']

  productsRouter
);

export default router;
