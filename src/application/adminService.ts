import { AdminRepoInfr } from "../infrastructure/repositories/adminRepositoryInfrastructure.js";
import Validator from "../commonComponent/validator.js";
import { ObjectId } from "typeorm";

export class AdminService {

    private adminRepository: AdminRepoInfr;

    constructor() {
        this.adminRepository = new AdminRepoInfr();
    }

    async addNewProduct(category: string, name: string, descr: string, sizes: string[],
        price: number, stock: number) {
        try {
            if (!Validator.isValidProduct(category, name, descr, sizes, price, stock)) {
                return { success: false, message: "Invalid product data" };
            }

            const product = await this.adminRepository.addNewProduct(category, name, descr, sizes, price, stock);

            return product
                ? { success: true, data: product }
                : { success: false, message: "Product not added" };
        }

        catch (error) {
            console.error("Error adding new product:", error);
            return { success: false, message: "Failed to add product" };
        }
    }

    async removeProduct(productId: ObjectId) {
        try {
            if (Validator.isEmpty(productId.toString())) {
                return { success: false, message: "Invalid product ID provided" };
            }

            const result = await this.adminRepository.removeProduct(productId);

            return result.affected
                ? { success: true, message: "Product removed successfully" }
                : { success: false, message: "Product not found or not removed" };
        }

        catch (error) {
            console.error("Error removing product:", error);
            return { success: false, message: "Failed to remove product" };
        }
    }

    async modifyProduct(productId: ObjectId, category: string, name: string, descr: string,
        sizes: string[], price: number, stock: number) {
        try {
            if (Validator.isEmpty(productId.toString())) {
                return { success: false, message: "Invalid product ID provided" };
            }

            if (!Validator.isValidProduct(category, name, descr, sizes, price, stock)) {
                return { success: false, message: "Invalid product data" };
            }

            const result = await this.adminRepository.modifyProduct(productId, category, name, descr, sizes, price, stock);

            return result.affected
                ? { success: true, message: "Product updated successfully" }
                : { success: false, message: "Product not found or not updated" };
        }

        catch (error) {
            console.error("Error modifying product:", error);
            return { success: false, message: "Failed to modify product" };
        }
    }

    async getAllUsers() {
        try {
            const users = await this.adminRepository.getAllUsers();

            return users.length
                ? { success: true, data: users }
                : { success: false, message: "No users found" };
        }

        catch (error) {
            console.error("Error fetching users:", error);
            return { success: false, message: "Failed to fetch users" };
        }
    }

    async getAllCarts() {
        try {
            const carts = await this.adminRepository.getAllCarts();

            return carts.length
                ? { success: true, data: carts }
                : { success: false, message: "No carts found" };
        }

        catch (error) {
            console.error("Error fetching carts:", error);
            return { success: false, message: "Failed to fetch carts" };
        }
    }

    async getAllOrders() {
        try {
            const orders = await this.adminRepository.getAllOrders();

            return orders.length
                ? { success: true, data: orders }
                : { success: false, message: "No orders found" };
        }

        catch (error) {
            console.error("Error fetching orders:", error);
            return { success: false, message: "Failed to fetch orders" };
        }
    }

    async getAllProducts() {
        try {
            const products = await this.adminRepository.getAllProducts();

            return products.length
                ? { success: true, data: products }
                : { success: false, message: "No products found" };
        }

        catch (error) {
            console.error("Error fetching products:", error);
            return { success: false, message: "Failed to fetch products" };
        }
    }
}
