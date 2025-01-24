import { Router } from "express";
import { ObjectId } from "mongodb";
import { ProductService } from "../../application/productService";
import Validator from "../../commonComponent/validator";

const router = Router();
const productService = new ProductService();
const availableCategories = Validator.arrayOfCategories;
const availableSizes = Validator.arrayOfSizes;

// GET /products – Renderowanie strony głównej z produktami
router.get('/products', async (req, res) => {
    const result = await productService.getAllProducts();

    if (result.success) {
        res.render('productViews/getAll', {
            title: 'Product List',
            products: result.data || [],
            categories: availableCategories,
            sizes: availableSizes
        });
    } else {
        res.render('productViews/productDetail', { title: 'Products', message: result.message });
    }
});

// GET /products/filterByPrice - Renderowanie strony z produktami (filtrowanie po cenie)
router.get('/filterByPrice', async (req, res) => {
    const { minPrice, maxPrice } = req.query;
    const min = parseFloat(minPrice!.toString());
    const max = parseFloat(maxPrice!.toString());
    const result = await productService.filterByPrice(min, max);

    if (result.success) {
        res.render('productViews/getAll', {
            title: 'Product List',
            products: result.data || [],
            categories: availableCategories,
            sizes: availableSizes
        });
    } else {
        res.render('productViews/productDetail', { title: 'Product List', message: result.message });
    }
});

// GET /products/filterByCategory - Renderowanie strony z produktami (filtrowanie po kategorii)
router.get('/filterByCategory', async (req, res) => {
    const { category } = req.query;
    const categoryString = category!.toString();
    const result = await productService.filterByCategory(categoryString);

    if (result.success) {
        res.render('productViews/getAll', {
            title: 'Product List',
            products: result.data || [],
            categories: availableCategories,
            sizes: availableSizes
        });
    } else {
        res.render('productViews/productDetail', { title: 'Product List', message: result.message });
    }
});

// GET /products/filterBySize - Renderowanie strony z produktami (filtrowanie po rozmiarze)
router.get('/products/filterBySize', async (req, res) => {
    const sizes = req.query.size; 
    if (Array.isArray(sizes) && sizes.length > 0) {
        const result = await productService.filterBySize(...sizes);
        res.render('productViews/getAll', {
            title: 'Product List',
            products: result.data || [],
            categories: availableCategories,
            sizes: availableSizes
        });
    } else {
        res.render('productViews/getAll', {
            title: 'Product List',
            products: [],
            categories: availableCategories,
            sizes: availableSizes
        });
    }
});

// GET /products/sortByPrice - Renderowanie strony z produktami (sortowanie po cenie)
router.get('/sortByPrice', async (req, res) => {
    const { sortOrder } = req.query;
    const order = sortOrder!.toString();
    const result = await productService.sortProductsByPrice(order);

    if (result.success) {
        res.render('productViews/getAll', {
            title: 'Product List',
            products: result.data || [],
            categories: availableCategories,
            sizes: availableSizes
        });
    } else {
        res.render('productViews/productDetail', { title: 'Product List', message: result.message });
    }

});

// GET /products/:productId - Renderowanie szczegółów jednego produktu
router.get('/products/:productId', async (req, res) => {
    const productId = req.params.productId;
    const id = new ObjectId(productId);
    const result = await productService.showProductInfo(id);

    if (result.success) {
        res.render('productViews/productDetail', { title: 'Product Detail', product: result.data });
    } else {
        res.render('productViews/productDetail', { title: 'Product Detail', message: result.message });
    }
});

// GET /products/search - Wyszukiwanie produktu po nazwie
router.get('/search', async (req, res) => {
    const productName = req.query.productName!.toString();
    const result = await productService.getProductByName(productName);

    if (result.success) {
        res.render('productViews/productSearch', { title: 'Search Results', products: result.data });
    } else {
        res.render('productViews/productSearch', { title: 'Search Results', message: result.message });
    }
});

export { router as productRoutes };
