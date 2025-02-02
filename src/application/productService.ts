import { ProductRepoInfr } from "../infrastructure/repositories/productRepositoryInfrastructure.js";
import Validator from "../commonComponent/validator.js";
import { ObjectId } from "typeorm";

export class ProductService {

    private productRepository: ProductRepoInfr;

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

    async showProductInfo(productId: ObjectId) {
        try {
            if (Validator.isEmpty(productId.toString())) {
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

    async getProductByName(productName: string) {
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

    async filterByPrice(minPrice: number, maxPrice: number) {
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

    async filterByCategory(category: string) {
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

    async filterBySize(size: string) {
        try {
            if (!Validator.isSizeRight(size)) {
                return { success: false, message: "Invalid size provided" };
            }

            const products = await this.productRepository.filterBySize(size);

            return products.length
                ? { success: true, data: products }
                : { success: false, message: "No products found in the specified size" };
        }

        catch (error) {
            console.error("Error filtering products by size:", error);
            return { success: false, message: "Failed to filter products by size" };
        }
    }

    async sortProductsByPrice(sortingOrder: string) {
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