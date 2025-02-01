import { Router } from "express";
import { ObjectId } from "mongodb";
import { ProductService } from "../../application/productService.js";
import Validator from "../../commonComponent/validator.js";

const router = Router();
const productService = new ProductService();
const availableCategories = Validator.arrayOfCategories;
const availableSizes = Validator.arrayOfSizes;

// GET /products – Renderowanie strony głównej z produktami
router.get('/', async (req, res) => {
    const result = await productService.getAllProducts();

    if (result.success) {
        res.render('productViews/getAll', {
            title: 'Product List',
            products: result.data || [],
            categories: availableCategories,
            sizes: availableSizes
        });
    } else {
        res.render('productViews/productDetail', { title: 'Products', message: result.message, product: null });
    }
});

// GET /products/filterByPrice - Renderowanie strony z produktami (filtrowanie po cenie)
router.get('/filterByPrice', async (req, res) => {
    const { minPrice, maxPrice } = req.query;
    
    // Pobranie wartości skrajnych jeśli użytkownik ich nie podał
    const min = minPrice ? parseFloat(minPrice as string) : 0; // Domyślne min = 0
    const max = maxPrice ? parseFloat(maxPrice as string) : 9999999; // Domyślnie max = coś irracjonalnie dużego
    const result = await productService.filterByPrice(min, max);

    if (result.success) {
        res.render('productViews/getAll', {
            title: 'Product List',
            products: result.data || [],
            categories: availableCategories,
            sizes: availableSizes
        });
    } else {
        res.render('productViews/productDetail', { title: 'Product List', message: result.message, product: null });
    }
});

// GET /products/filterByCategory - Renderowanie strony z produktami (filtrowanie po kategorii)
router.get('/filterByCategory', async (req, res) => {
    const { category } = req.query;

    // Sprawdź, czy w ogóle ktoś zaznaczył kategorię
    if (!category) {
        // Jeżeli nic nie wybrano, przekieruj do głównej listy produktów
        return res.redirect('/products');
    }

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
        res.render('productViews/productDetail', { title: 'Product List', message: result.message, product: null });
    }
});

// GET /products/filterBySize - Renderowanie strony z produktami (filtrowanie po rozmiarze)
router.get('/filterBySize', async (req, res) => {
    const sizes = req.query.size; 

    if (!sizes) {
        // np. nic nie robimy, tylko wyświetlamy z powrotem pełną listę 
        return res.redirect('/products');
    }

    if (sizes) {
        // Upewniamy się, że każda wartość w tablicy jest stringiem
        let sizesArray: string[] = Array.isArray(sizes) 
            ? sizes.map(size => String(size)) 
            : [String(sizes)];
        const result = await productService.filterBySize(...sizesArray);
        
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
        res.render('productViews/productDetail', { title: 'Product List', message: result.message, product: null });
    }

});

// GET /products/:productId - Renderowanie szczegółów jednego produktu
router.get('/:productId', async (req, res) => {
    const productId = req.params.productId;
    const id = new ObjectId(productId);
    const result = await productService.showProductInfo(id);

    if (result.success) {
        res.render('productViews/productDetail', { title: 'Product Detail', product: result.data });
    } else {
        res.render('productViews/productDetail', { title: 'Product Detail', message: result.message, product: null });
    }
});

// GET /products/search - Wyszukiwanie produktu po nazwie
router.get('/search', async (req, res) => {
    const productName = req.query.productName!.toString();
    const result = await productService.getProductByName(productName);

    if (result.success) {
        res.render('productViews/productSearch', { title: 'Search Results', products: result.data });
    } else {
        res.render('productViews/productSearch', { title: 'Search Results', message: result.message, products: null });
    }
});

export { router as productRoutes };
