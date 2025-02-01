// plik index.ts do zaimportowania wszystkich tras i połączenia ich z głównym serwerem
import { Router } from "express";
import { adminRoutes } from "./adminRoutes";
import { cartRoutes } from "./cartRoutes";
import { productRoutes } from "./productRoutes";
import { userRoutes } from "./userRoutes";
const router = Router();
// Dodanie domyślnych prefiksów do tras
router.use('/admin', adminRoutes);
router.use('/cart', cartRoutes);
router.use('/products', productRoutes);
router.use('/users', userRoutes);
export default router;
