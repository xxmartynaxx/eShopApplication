import { ProductRepoInfr } from "../infrastructure/repositories/productRepositoryInfrastructure";
import Validator from "../commonComponent/validator";

export class ProductService {
    constructor() {
        this.productRepository = new ProductRepoInfr();
    }

    async getAllProducts() {
        try {
            const products = await this.productRepository.getAllProducts();

            return products
                ? { success: true, data: products }
                : { success: false, message: "Products not found" };
        }

        catch (error) {
            console.error("Error fetching products:", error);
            return { success: false, message: "Failed to fetch products" };
        }
    }

    // after clicking on the specific product
    async showProductInfo(productId) {
        try {
            if (Validator.isEmpty(productId)) {
                return { success: false, message: "Invalid product ID provided" };
            }

            const product = await this.productRepository.showProductInfo(productId);

            return product
                ? { success: true, data: product }
                : { success: false, message: "Product not found" };
        }

        catch (error) {
            console.error("Error showing product info:", error);
            return { success: false, message: "Failed to show product info" };
        }
    }

    // search box
    async getProductByName(productName) {
        try {
            if (!Validator.isString(productName)) {
                return { success: false, message: "Invalid product name provided" };
            }

            const product = await this.productRepository.getProductByName(productName);

            return product
                ? { success: true, data: product }
                : { success: false, message: "Product not found" };
        }

        catch (error) {
            console.error("Error getting product by name:", error);
            return { success: false, message: "Failed to get product by name" };
        }
    }

    // type boxes
    async filterByPrice(minPrice, maxPrice) {
        try {
            if (!Validator.isPositiveNumber(minPrice) || !Validator.isPositiveNumber(maxPrice) ||
                (minPrice > maxPrice)) {
                    return { success: false, message: "Invalid price range" };
                }
            
            const products = await this.productRepository.filterByPrice(minPrice, maxPrice);

            return products.length
                ? { success: true, data: products }
                : { success: false, message: "No products found in the specified price range" };
        }

        catch (error) {
            console.error("Error filtering products by price:", error);
            return { success: false, message: "Failed to filter products by price" };
        }
    }

    // List like the one in the Express Ex2 (radio)
    async filterByCategory(category) {
        try {
            if (!Validator.isCategoryRight(category)) {
                return { success: false, message: "Invalid category" };
            }

            const products = await this.productRepository.filterByCategory(category);

            return products.length
                ? { success: true, data: products }
                : { success: false, message: "No products found in the specified category" };
        }

        catch (error) {
            console.error("Error filtering products by category:", error);
            return { success: false, message: "Failed to filter products by category" };
        }
    }

    // List like the one in the Express Ex2 (checkboxes)
    async filterBySize(...sizes) {
        try {
            if (!Validator.isSizeRight(sizes)) {
                return { success: false, message: "Invalid sizes provided" };
            }

            const products = await this.productRepository.filterBySize(sizes);

            return products.length
                ? { success: true, data: products }
                : { success: false, message: "No products found in the specified sizes" };
        }

        catch (error) {
            console.error("Error filtering products by size:", error);
            return { success: false, message: "Failed to filter products by size" };
        }
    }

    // List like the one in the Express Ex2 (radio)
    async sortProductsByPrice(sortingOrder) {
        try {
            if (!["ASC", "DESC"].includes(sortingOrder)) {
                return { success: false, message: "Invalid sorting order" };
            }

            const products = await this.productRepository.sortProductsByPrice(sortingOrder);

            return products.length
                ? { success: true, data: products }
                : { success: false, message: "No products found to sort" };
        }

        catch (error) {
            console.error("Error sorting products by price:", error);
            return { success: false, message: "Failed to sort products by price" };
        }
    }
}