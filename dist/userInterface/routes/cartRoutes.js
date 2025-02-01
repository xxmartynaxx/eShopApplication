// NA RAZIE JEDEN WIELKI SYF
import { Router } from "express";
import { CartService } from "../../application/cartService";
import { OrderService } from "../../application/orderService";
import { ObjectId } from "mongodb";
const router = Router();
const cartService = new CartService();
const orderService = new OrderService();
// POST /cart/addItem – Obsługa formularza dodania produktu do koszyka
router.post('/addItem', async (req, res) => {
    const { productId, cartId, quantity } = req.body;
    const result = await cartService.addProductToCart(new ObjectId(productId), new ObjectId(cartId), quantity);
    if (result.success) {
        res.redirect('/products');
    }
    else {
        res.status(400).send(result.message);
    }
});
// POST /cart/changeQuantity - Obsługa formularza zmiany ilości produktu w koszyku
router.post('/changeQuantity', async (req, res) => {
    const { cartItemId, quantity } = req.body;
    const result = await cartService.changeQuantity(new ObjectId(cartItemId), parseInt(quantity));
    if (result.success) {
        res.render(`/cart/${req.body.cartId}`); // Przekierowanie do widoku koszyka
    }
    else {
        res.render(`/cart/${req.body.cartId}`, { title: 'Cart Items', message: result.message });
    }
});
// POST /cart/removeItem – Obsługa formularza usuwania produktu z koszyka
router.post('/removeItem', async (req, res) => {
    const { cartItemId } = req.body;
    const result = await cartService.removeProductFromCart(new ObjectId(cartItemId));
    if (result.success) {
        res.redirect(`/cart/${req.body.cartId}`); // Przekierowanie do widoku koszyka
    }
    else {
        res.render(`/cart/${req.body.cartId}`, { title: 'Cart Items', message: result.message });
    }
});
// POST /cart/createOrder - Obsługa formularza złożenia zamówienia
router.post('/createOrder', async (req, res) => {
    const { cartId } = req.body;
    const result = await orderService.createOrder(new ObjectId(cartId));
    if (result.success) {
        res.render('/products');
    }
    else {
        res.render('/products', { message: result.message });
    }
});
// GET /cart/getAll – Renderowanie koszyka użytkownika lub stworzenie nowego
router.get('/getAll', async (req, res) => {
    const userId = req.body;
    if (!userId) {
        return res.redirect('/users/login');
    }
    let cartResponse = await cartService.getCart(userId);
    // Jeśli koszyk nie istnieje, utwórz nowy
    if (!cartResponse.success) {
        cartResponse = await cartService.createNewCart(userId);
    }
    if (cartResponse.success) {
        const cartId = cartResponse.data.id;
        const itemsResponse = await cartService.showAllCartItems(cartId);
        const summaryResponse = await cartService.cartSummary(cartId);
        return res.render('cartView', {
            title: 'Cart Items',
            items: itemsResponse.data || [],
            totalCost: summaryResponse.data?.totalCost || 0,
            numOfItems: summaryResponse.data?.numOfCartItems || 0,
        });
    }
    else {
        res.render('layouts/user', { title: 'Error', message: cartResponse.message });
    }
});
export { router as cartRoutes };
