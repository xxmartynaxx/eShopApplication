import { Router, Request, Response } from "express";
import { ObjectId } from "mongodb";
import { AdminService } from "../../application/adminService";
import { ProductService } from "../../application/productService";

const router = Router();
const adminService = new AdminService();
const productService = new ProductService();

// GET /admin – Renderowanie strony głównej administratora
router.get('/', (req, res) => {
    res.render('layouts/admin', { title: 'Admin Home' });
});


// GET /admin/addProduct – Renderowanie formularza dodawania produktu
router.get('/addProduct', (req, res) => {
    res.render('adminViews/addProduct', { title: 'Add a new Product' });
});

// POST /admin/addProduct – Obsługa formularza dodawania produktu
router.post('/addProduct', async (req, res) => {
    const { category, name, descr, sizes, price, stock } = req.body;
    const response = await adminService.addNewProduct(category, name, descr, sizes, price, stock);

    if (response.success) {
        res.redirect('/admin');
    } else {
        res.render('adminViews/addProduct', { title: 'Add a new Product', error: response.message });
    }
});


// GET /admin/removeProduct – Renderowanie formularza usuwania produktu
router.get('/removeProduct', (req, res) => {
    res.render('adminViews/removeProduct', { title: 'Remove a Product' });
});

// POST /admin/removeProduct – Obsługa formularza usuwania produktu
router.post('/removeProduct', async (req, res) => {
    const productId = req.body.productId;
    const response = await adminService.removeProduct(productId);

    if (response.success) {
        res.redirect('/admin');
    } else {
        res.render('adminViews/removeProduct', { title: 'Remove a Product', error: response.message });
    }
});

// GET /admin/modifyProduct – Renderowanie formularza wyboru produktu do modyfikacji
router.get('/modifyProduct', (req, res) => {
    res.render('adminViews/modifyProduct', { title: 'Choose product to modify' });
});

// POST /admin/chosenModifyProduct – Obsługa formularza wyboru produktu (nazwa dziwna, żeby się nie gryzła)
router.post('/chosenModifyProduct', (req, res) => {
    const productId = req.body.productId;

    if (!productId) {
        res.render('adminViews/modifyProduct', { title: 'Choose product to modify', error: 'Type in the correct ID '})
    }

    res.redirect(`/modifyProduct/${productId}`); // Przekierowanie do edycji konkretnego produktu
});

// GET /admin/modifyProduct/:productId – Renderowanie formularza modyfikacji produktu (z danymi produktu)
router.get('/modifyProduct/:productId', async (req, res) => {
    const productId = req.params.productId;
    const id = new ObjectId(productId);

    const product = await productService.showProductInfo(id);

    res.render('adminViews/modifyProduct', { title: 'Modify a Product', product });
});

// POST /admin/modifyProduct – Obsługa formularza modyfikowania produktu
router.post('/modifyProduct', async (req, res) => {
    const { productId, category, name, descr, sizes, price, stock } = req.body;
    const response = await adminService.modifyProduct(productId, category, name, descr, sizes, price, stock);

    if (response.success) {
        res.redirect('/admin');
    } else {
        res.render('adminViews/modifyProduct', {
            title: 'Modify a Product',
            error: response.message,
            product: { id: productId, category, name, descr, sizes, price, stock }
        });
    }
});


// GET /admin/getAll?type=users|carts|orders
router.get('/getAll', async (req: Request, res: Response): Promise<void> => {

    const { type } = req.query; 
    let data;
    switch (type) {
        case 'users':
            data = await adminService.getAllUsers(); 
            break;
        case 'carts':
            data = await adminService.getAllCarts(); 
            break;
        case 'orders':
            data = await adminService.getAllOrders(); 
            break;
        default:
            res.status(400).send('Invalid type parameter');
            return;
    }

    res.render('adminViews/getAll', { title: `All ${type}`, data, type });
});

export { router as adminRoutes };
