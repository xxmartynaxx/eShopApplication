import { Router } from "express";
import { OrderService } from "../../application/orderService";

const router = Router();
const orderService = new OrderService(); 

// metody na podstawie userRoutes.ts

export { router as orderRoutes };