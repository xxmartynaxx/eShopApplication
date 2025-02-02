// NA RAZIE JEDEN WIELKI SYF
import { Router } from "express";
import { CartService } from "../../application/cartService.js";
import { OrderService } from "../../application/orderService.js";
import { UserService } from "../../application/userService.js";
import { ProductService } from "../../application/productService.js";
import Validator from "../../commonComponent/validator.js";
import { ObjectId } from "mongodb";

const router = Router();
const cartService = new CartService();
const productService = new ProductService();
const orderService = new OrderService();
const userService = new UserService();
const availableCategories = Validator.arrayOfCategories;
const availableSizes = Validator.arrayOfSizes;

// POST /cart/addItem – Obsługa formularza dodania produktu do koszyka
router.post('/addItem', async (req, res) => {
    let response = await userService.getUserRole(req.cookies.userSession)
    if (response.success && response.role === 'user') {

        const userId = req.cookies.userSession;

        let cartResponse = await cartService.getCart(new ObjectId(userId));
        if (!cartResponse.success) {
            cartResponse = await cartService.createNewCart(new ObjectId(userId));
        }

        const cartId = cartResponse.data!.id;
        const { productId, quantity } = req.body;

        const result = await cartService.addProductToCart(new ObjectId(productId), new ObjectId(cartId), parseInt(quantity));

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
        res.redirect(`/cart/getAll`);
    } else {
        res.render(`cartViews/getAll`, { title: 'Cart Items', message: result.message });
    }

});

// POST /cart/removeItem – Obsługa formularza usuwania produktu z koszyka
router.post('/removeItem', async (req, res) => {
    const { cartItemId } = req.body;
    const result = await cartService.removeProductFromCart(new ObjectId(cartItemId));

    if (result.success) {
        res.redirect(`/cart/getAll`);
    } else {
        res.render(`cartViews/getAll`, { title: 'Cart Items', message: result.message });
    }

});

// POST /cart/createOrder - Obsługa formularza złożenia zamówienia
router.post('/createOrder', async (req, res) => {
    const userIsLoggedIn = !!req.cookies.userSession;
    const { cartId } = req.body;
    const result = await orderService.createOrder(new ObjectId(cartId));

    if (result.success) {
        res.redirect('/products');
    } else {
        res.render('productViews/getAll', { 
            title: 'Product List',
            products: result.data || [],
            categories: availableCategories,
            sizes: availableSizes,
            userIsLoggedIn: userIsLoggedIn,
            message: result.message });
    }

});

// GET /cart/getAll – Renderowanie koszyka użytkownika lub stworzenie nowego
router.get('/getAll', async (req, res) => {
    let userId = req.cookies.userSession;

    if (!userId) {
        res.render('userViews/login', { title: 'Login', error: "Please log in first." });
    }

    var cartResponse = await cartService.getCart(new ObjectId(userId));

    // Jeśli koszyk nie istnieje, utwórz nowy
    if (!cartResponse.success) {
        cartResponse = await cartService.createNewCart(new ObjectId(userId));
        if (!cartResponse.success) {
            return res.render('cartViews/getAll', {
                title: 'Cart Items',
                mappedItems: [],
                cartId: null,
                totalCost: 0,
                numOfCartItems: 0,
                message: cartResponse.message
            });
        }
    }

    const cartId = cartResponse.data!.id;
    const itemsResponse = await cartService.showAllCartItems(cartId);

    if ( itemsResponse.data?.length ) {
        var mappedItems = await Promise.all(itemsResponse.data!.map(async (item) => {
            const productInfo = await productService.showProductInfo(new ObjectId(item.product));
            return {
                _id: item.id,
                name: productInfo.data?.name,
                quantity: item.quantity,
                price: productInfo.data?.price
            };
        }));
    }

    else {
        var mappedItems: { _id: ObjectId; name: string | undefined; quantity: number; price: number | undefined; }[] = [];
    }

    const summaryResponse = await cartService.cartSummary(cartId);

    return res.render('cartViews/getAll', {
        title: 'Cart Items',
        mappedItems: mappedItems,
        cartId: cartId,
        totalCost: summaryResponse.data?.totalCost || 0,
        numOfCartItems: summaryResponse.data?.numOfCartItems || 0,
    });

});

export { router as cartRoutes };