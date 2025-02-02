import { Router, Request, Response } from "express";
import { ObjectId } from "mongodb";
import { AdminService } from "../../application/adminService.js";
import { ProductService } from "../../application/productService.js";
import { UserService } from "../../application/userService.js";
import Validator from "../../commonComponent/validator.js";

const router = Router();
const adminService = new AdminService();
const productService = new ProductService();
const userService = new UserService();
const availableCategories = Validator.arrayOfCategories;
const availableSizes = Validator.arrayOfSizes;

// GET /admin – Renderowanie strony głównej administratora
router.get('/', async (req, res) => {
    let response = await userService.getUserRole(req.cookies.userSession)
    if (response.success && response.role === 'admin') {
        res.render('layouts/admin', { title: 'Admin Home' });
    }
    else if (response.success) {
        res.render('userViews/login', { title: 'Login', error: "Access denied. Please log in with an appropriate account." })
    }
    else {
        res.render('userViews/login', { title: 'Login', error: response.message })
    }
});


// GET /admin/addProduct – Renderowanie formularza dodawania produktu
router.get('/addProduct', async (req, res) => {
    let response = await userService.getUserRole(req.cookies.userSession)
    if (response.success && response.role === 'admin') {
        res.render('adminViews/addProduct', { title: 'Add a new Product', availableCategories, availableSizes, error: null });
    }
    else if (response.success) {
        res.render('userViews/login', { title: 'Login', error: "Access denied. Please log in with an appropriate account." })
    }
    else {
        res.render('userViews/login', { title: 'Login', error: response.message })
    }
});

// POST /admin/addProduct – Obsługa formularza dodawania produktu
router.post('/addProduct', async (req, res) => {
    let response_1 = await userService.getUserRole(req.cookies.userSession)
    if (response_1.success && response_1.role === 'admin') {
        const { category, name, descr } = req.body;
        const sizes = Array.isArray(req.body.sizes) ? req.body.sizes : (req.body.sizes ? [req.body.sizes] : []);
        const price = parseFloat(req.body.price);
        const stock = parseInt(req.body.stock, 10);

        const response = await adminService.addNewProduct(category, name, descr, sizes, price, stock);

        if (response.success) {
            res.redirect('/admin');
        } else {
            res.render('adminViews/addProduct', { 
                title: 'Add a new Product', 
                availableCategories, availableSizes, 
                error: response.message 
            });
        }
    }
    else if (response_1.success) {
        res.render('userViews/login', { title: 'Login', error: "Access denied. Please log in with an appropriate account." })
    }
    else {
        res.render('userViews/login', { title: 'Login', error: response_1.message })
    }
});


// GET /admin/removeProduct – Renderowanie formularza usuwania produktu
router.get('/removeProduct', async (req, res) => {
    let response = await userService.getUserRole(req.cookies.userSession)
    if (response.success && response.role === 'admin') {
        res.render('adminViews/removeProduct', { title: 'Remove a Product', error: null });
    }
    else if (response.success) {
        res.render('userViews/login', { title: 'Login', error: "Access denied. Please log in with an appropriate account." })
    }
    else {
        res.render('userViews/login', { title: 'Login', error: response.message })
    }
});

// POST /admin/removeProduct – Obsługa formularza usuwania produktu
router.post('/removeProduct', async (req, res) => {
    let response_1 = await userService.getUserRole(req.cookies.userSession)
    if (response_1.success && response_1.role === 'admin') {
        const productId = req.body.productId;
        const response = await adminService.removeProduct(new ObjectId(productId));

        if (response.success) {
            res.redirect('/admin');
        } else {
            res.render('adminViews/removeProduct', { title: 'Remove a Product', error: response.message });
        }
    }
    else if (response_1.success) {
        res.render('userViews/login', { title: 'Login', error: "Access denied. Please log in with an appropriate account." })
    }
    else {
        res.render('userViews/login', { title: 'Login', error: response_1.message })
    }
});

// GET /admin/modifyProduct – Renderowanie formularza wyboru produktu do modyfikacji
router.get('/modifyProduct', async (req, res) => {
    let response = await userService.getUserRole(req.cookies.userSession)
    if (response.success && response.role === 'admin') {
        res.render('adminViews/chooseProduct', { title: 'Choose product to modify', error: null });
    }
    else if (response.success) {
        res.render('userViews/login', { title: 'Login', error: "Access denied. Please log in with an appropriate account." })
    }
    else {
        res.render('userViews/login', { title: 'Login', error: response.message })
    }
});

// POST /admin/chosenModifyProduct – Obsługa formularza wyboru produktu (nazwa dziwna, żeby się nie gryzła)
router.post('/chosenModifyProduct', async (req, res) => {
    let response = await userService.getUserRole(req.cookies.userSession)
    if (response.success && response.role === 'admin') {
        const productId = req.body.productId;

        if (!productId) {
            res.render('adminViews/modifyProduct', { title: 'Choose product to modify', error: 'Type in the correct ID '})
        }

        res.redirect(`/admin/modifyProduct/${productId}`); // Przekierowanie do edycji konkretnego produktu
    }
    else if (response.success) {
        res.render('userViews/login', { title: 'Login', error: "Access denied. Please log in with an appropriate account." })
    }
    else {
        res.render('userViews/login', { title: 'Login', error: response.message })
    }
});

// GET /admin/modifyProduct/:productId – Renderowanie formularza modyfikacji produktu (z danymi produktu)
router.get('/modifyProduct/:productId', async (req, res) => {
    let response_1 = await userService.getUserRole(req.cookies.userSession)
    if (response_1.success && response_1.role === 'admin') {
        const productId = req.params.productId;
        const id = new ObjectId(productId);

        const response = await productService.showProductInfo(id);

        console.log(response.data)

        res.render('adminViews/modifyProduct', { title: 'Modify a Product', product: response.data, error: null,
            availableCategories, availableSizes
        });
    }
    else if (response_1.success) {
        res.render('userViews/login', { title: 'Login', error: "Access denied. Please log in with an appropriate account." })
    }
    else {
        res.render('userViews/login', { title: 'Login', error: response_1.message })
    }
});

// POST /admin/modifyProduct – Obsługa formularza modyfikowania produktu
router.post('/modifyProduct', async (req, res) => {
    let response_1 = await userService.getUserRole(req.cookies.userSession)
    if (response_1.success && response_1.role === 'admin') {
        const { productId, category, name, descr } = req.body;
        const sizes = Array.isArray(req.body.sizes) ? req.body.sizes : (req.body.sizes ? [req.body.sizes] : []);
        const price = parseFloat(req.body.price);
        const stock = parseInt(req.body.stock, 10);
        
        console.log(productId)

        const response = await adminService.modifyProduct(new ObjectId(productId), category, name, descr, sizes, price, stock);

        if (response.success) {
            res.redirect('/admin');
        } else {
            res.render('adminViews/modifyProduct', {
                title: 'Modify a Product', availableCategories, availableSizes,
                error: response.message,
                product: { _id: productId, category, name, description: descr, sizesAvailable: sizes, price, stock }
            });
        }
    }
    else if (response_1.success) {
        res.render('userViews/login', { title: 'Login', error: "Access denied. Please log in with an appropriate account." })
    }
    else {
        res.render('userViews/login', { title: 'Login', error: response_1.message })
    }
});


// GET /admin/getAll?type=users|carts|orders
router.get('/getAll', async (req: Request, res: Response): Promise<void> => {
    let response_1 = await userService.getUserRole(req.cookies.userSession)
    if (response_1.success && response_1.role === 'admin') {
        const { type } = req.query; 
        let response;
        switch (type) {
            case 'users':
                response = await adminService.getAllUsers(); 
                break;
            case 'carts':
                response = await adminService.getAllCarts(); 
                break;
            case 'orders':
                response = await adminService.getAllOrders(); 
                break;
            case 'products':
                response = await adminService.getAllProducts(); 
                break;
            default:
                res.status(400).send('Invalid type parameter');
                return;
        }

        if (response.success) {
            res.render('adminViews/getAll', { title: `All ${type}`, data: response.data, type, message: null });
        }
        else {
            res.render('adminViews/getAll', { title: `All ${type}`, data: response.data, type, message: response.message });
        }
    }
    else if (response_1.success) {
        res.render('userViews/login', { title: 'Login', error: "Access denied. Please log in with an appropriate account." })
    }
    else {
        res.render('userViews/login', { title: 'Login', error: response_1.message })
    }
});

export { router as adminRoutes };
