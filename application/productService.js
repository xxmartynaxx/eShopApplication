import { ProductRepoInfr } from "../infrastructure/repositories/productRepositoryInfrastructure";
import Validator from "../commonComponent/validator";

export class ProductService {
    constructor() {
        this.productRepository = new ProductRepoInfr();
    }

    async getAllProducts() {
        try {

        }

        catch (error) {

        }
    }

    // after clicking on the specific product
    async showProductInfo(productId) {
        try {

        }

        catch (error) {

        }
    }

    // search box
    // v: string
    async getProductByName(productName) {
        try {

        }

        catch (error) {

        }
    }

    // type boxes
    // v: positive nums, minPrice <= maxPrice
    async filterByPrice(minPrice, maxPrice) {
        try {

        }

        catch (error) {

        }
    }

    // List like the one in the Express Ex2 
    // v: string
    async filterByCategory(category) {
        try {

        }

        catch (error) {

        }
    }

    // v: in ["XS", "S", "M", "L", "XL"], 1 <= sizes.length <= 5
    async filterBySize(...sizes) {
        try {

        }

        catch (error) {

        }
    }

    // v: in ["ASC", "DESC"]
    async sortProductsByPrice(sortingOrder) {
        try {

        }

        catch (error) {

        }
    }
}