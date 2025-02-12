// plik index.ts do zaimportowania wszystkich tras i połączenia ich z głównym serwerem

import { Router } from "express";
import { adminRoutes } from "./adminRoutes.js";
import { cartRoutes } from "./cartRoutes.js";
import { productRoutes } from "./productRoutes.js";
import { userRoutes } from "./userRoutes.js";

const router = Router();

// przekierowanie ze strony głównej na home
router.get('/', (req, res) => {
    res.render('layouts/home', { title: 'Homepage' });
});

// Dodanie domyślnych prefiksów do tras
router.use('/admin', adminRoutes);
router.use('/cart', cartRoutes);
router.use('/products', productRoutes);
router.use('/users', userRoutes);

export default router;
