import { Router } from "express";
import { CartService } from "../../application/cartService";

const router = Router();
const cartService = new CartService(); 

// metody na podstawie userRoutes.ts

export { router as cartRoutes };