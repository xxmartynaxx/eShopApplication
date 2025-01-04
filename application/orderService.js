import { OrderRepoInfr } from "../infrastructure/repositories/orderRepositoryInfrastructure";
import Validator from "../commonComponent/validator";

export class OrderService {
    constructor() {
        this.orderRepository = new OrderRepoInfr();
    }

    async createOrder(cartId) {
        try {
            if (Validator.isEmpty(cartId)) {
                return { success: false, message: "Invalid cart ID provided" };
            }

            const newOrder = await this.orderRepository.createOrder(cartId);

            if (newOrder) {
                return { success: true, data: newOrder, message: "Order created successfully" };
            }

            return { success: false, message: "Order creation failed: cart is empty or invalid" };
        } 
        
        catch (error) {
            console.error("Error creating the order:", error);
            return { success: false, message: "Failed to create order" };
        }
    }
}