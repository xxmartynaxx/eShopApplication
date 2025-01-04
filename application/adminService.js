import { AdminRepoInfr } from "../infrastructure/repositories/adminRepositoryInfrastructure";
import Validator from "../commonComponent/validator";

export class AdminService {
    constructor() {
        this.adminRepository = new AdminRepoInfr();
    }

    async addNewProduct(category, name, descr, sizes, price, stock) {
        try {
            if (!Validator.isValidProduct(category, name, descr, sizes, price, stock)) {
                return { success: false, message: "Invalid product data" };
            }

            const product = await this.adminRepository.addNewProduct(category, name, descr, sizes, price, stock);
            return { success: true, data: product };
        }

        catch (error) {
            console.error("Error adding new product:", error);
            return { success: false, message: "Failed to add product" };
        }
    }

    async removeProduct(productId) {
        try {
            if (Validator.isEmpty(productId)) {
                return { success: false, message: "Invalid product ID provided" };
            }

            const result = await this.adminRepository.removeProduct(productId);
            if (result.affected === 0) {
                return { success: false, message: "Product not found or not deleted" };
            }

            return { success: true, message: "Product removed successfully" };
        } 

        catch (error) {
            console.error("Error removing product:", error);
            return { success: false, message: "Failed to remove product" };
        }
    }

    async modifyProduct(productId, category, name, descr, sizes, price, stock) {
        try {
            if (Validator.isEmpty(productId)) {
                return { success: false, message: "Invalid product ID provided" };
            }
            
            if (!Validator.isValidProduct(category, name, descr, sizes, price, stock)) {
                return { success: false, message: "Invalid product data" };
            }

            const result = await this.adminRepository.modifyProduct(productId, category, name, descr, sizes, price, stock);
            if (result.affected === 0) {
                return { success: false, message: "Product not found or not updated" };
            }

            return { success: true, message: "Product updated successfully" };
        } 
        
        catch (error) {
            console.error("Error modifying product:", error);
            return { success: false, message: "Failed to modify product" };
        }
    }

    async getAllUsers() {
        try {
            const users = await this.adminRepository.getAllUsers();
            return { success: true, data: users };
        } 
        
        catch (error) {
            console.error("Error fetching users:", error);
            return { success: false, message: "Failed to fetch users" };
        }
    }

    async getAllCarts() {
        try {
            const carts = await this.adminRepository.getAllCarts();
            return { success: true, data: carts };
        } 
        
        catch (error) {
            console.error("Error fetching carts:", error);
            return { success: false, message: "Failed to fetch carts" };
        }
    }

    async getAllOrders() {
        try {
            const orders = await this.adminRepository.getAllOrders();
            return { success: true, data: orders };
        } 
        
        catch (error) {
            console.error("Error fetching orders:", error);
            return { success: false, message: "Failed to fetch orders" };
        }
    }
}
