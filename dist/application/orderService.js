import { OrderRepoInfr } from "../infrastructure/repositories/orderRepositoryInfrastructure.js";
import Validator from "../commonComponent/validator.js";
export class OrderService {
    constructor() {
        this.orderRepository = new OrderRepoInfr();
    }
    async createOrder(cartId) {
        try {
            if (Validator.isEmpty(cartId.toString())) {
                return { success: false, message: "Invalid cart ID provided" };
            }
            const newOrder = await this.orderRepository.createOrder(cartId);
            return newOrder
                ? { success: true, data: newOrder }
                : { success: false, message: "Order creation failed: cart is empty or invalid" };
        }
        catch (error) {
            console.error("Error creating the order:", error);
            return { success: false, message: "Failed to create order" };
        }
    }
}
