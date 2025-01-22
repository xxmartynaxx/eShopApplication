import { Router } from "express";
import { AdminService } from "../../application/adminService";

const router = Router();
const adminService = new AdminService(); 

// metody na podstawie userRoutes.ts

export { router as adminRoutes };