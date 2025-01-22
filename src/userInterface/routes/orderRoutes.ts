// NA RAZIE NIE WIEM JAK TO SENSOWNIE ZROBIĆ
import { Router } from "express";
import { OrderService } from "../../application/orderService";

const router = Router();
const orderService = new OrderService(); 

// POST /orders – Obsługa formularza złożenia zamówienia
router.post('/createOder', async (req, res) => {
    const { cartId } = req.body; // skąd pobierać id koszyka?
    const response = await orderService.createOrder(cartId);

    if (response.success) {
        res.redirect('/cart'); 
    } else {
        res.render('cartViews/getCart', { title: 'Cart', error: response.message });
    }
});

export { router as orderRoutes };