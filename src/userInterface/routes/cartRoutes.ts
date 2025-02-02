// NA RAZIE JEDEN WIELKI SYF
import { Router } from "express";
import { CartService } from "../../application/cartService.js";
import { OrderService } from "../../application/orderService.js";
import { UserService } from "../../application/userService.js";
import { ObjectId } from "mongodb";

const router = Router();
const cartService = new CartService();
const orderService = new OrderService();
const userService = new UserService();

// POST /cart/addItem – Obsługa formularza dodania produktu do koszyka
router.post('/addItem', async (req, res) => {
    let response = await userService.getUserRole(req.cookies.userSession)
    if (response.success && response.role === 'user') {

        // DODAĆ ŚCIĄGANIE Z req.cookies.userSession ID UŻYTKOWNIKA -> ODPOWIEDNI KOSZYK

        const { productId, cartId, quantity } = req.body;
        const result = await cartService.addProductToCart(new ObjectId(productId), new ObjectId(cartId), quantity);

        if (result.success) {
            res.redirect('/products');
        } else {
            res.status(400).send(result.message);
        }
    }
    else if (response.success) {
        res.render('userViews/login', { title: 'Login', error: "Access denied. Please log in with an appropriate account." })
    }
    else {
        res.render('userViews/login', { title: 'Login', error: response.message })
    }
});

// POST /cart/changeQuantity - Obsługa formularza zmiany ilości produktu w koszyku
router.post('/changeQuantity', async (req, res) => {
    const { cartItemId, quantity } = req.body;
    const result = await cartService.changeQuantity(new ObjectId(cartItemId), parseInt(quantity));

    if (result.success) {
        res.redirect(`/cart/getAll`, /*something*/); // Przekierowanie do widoku koszyka
    } else {
        res.render(`/cart/${req.body.cartId}`, { title: 'Cart Items', message: result.message });
    }

});

// POST /cart/removeItem – Obsługa formularza usuwania produktu z koszyka
router.post('/removeItem', async (req, res) => {
    const { cartItemId } = req.body;
    const result = await cartService.removeProductFromCart(new ObjectId(cartItemId));

    if (result.success) {
        res.redirect(`/cart/${req.body.cartId}`); // Przekierowanie do widoku koszyka
    } else {
        res.render(`/cart/${req.body.cartId}`, { title: 'Cart Items', message: result.message });
    }

});

// POST /cart/createOrder - Obsługa formularza złożenia zamówienia
router.post('/createOrder', async (req, res) => {
    const { cartId } = req.body;
    const result = await orderService.createOrder(new ObjectId(cartId));

    if (result.success) {
        res.render('/products'); 
    } else {
        res.render('/products', { message: result.message });
    }

});

// GET /cart/getAll – Renderowanie koszyka użytkownika lub stworzenie nowego
router.get('/getAll', async (req, res) => {
    let userId = req.cookies.userSession 

    if (!userId) {
        res.render('userViews/login', { title: 'Login', error: "Please log in first." });
    }

    let cartResponse = await cartService.getCart(userId);

    // Jeśli koszyk nie istnieje, utwórz nowy
    if (!cartResponse.success) {
        cartResponse = await cartService.createNewCart(userId);
    }

    if (cartResponse.success) {
        const cartId = cartResponse.data!.id;

        const itemsResponse = await cartService.showAllCartItems(cartId);
        const summaryResponse = await cartService.cartSummary(cartId);

        return res.render('cartViews/getAll', {
            title: 'Cart Items',
            items: itemsResponse.data || [],
            totalCost: summaryResponse.data?.totalCost || 0,
            numOfItems: summaryResponse.data?.numOfCartItems || 0,
        });
    } else {
        res.render('layouts/user', { title: 'Error' });
    }
});

export { router as cartRoutes };