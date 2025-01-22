import { Router } from "express";
import { ProductService } from "../../application/productService";

const router = Router();
const productService = new ProductService(); 

// metody na podstawie userRoutes.ts

export { router as productRoutes };
