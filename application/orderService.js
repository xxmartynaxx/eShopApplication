import { OrderRepoInfr } from "../infrastructure/repositories/orderRepositoryInfrastructure";
import Validator from "../commonComponent/validator";

export class OrderService {
    constructor() {
        this.orderRepository = new OrderRepoInfr();
    }

    async createOrder(cartId) {
        try {
            
        } 
        
        catch (error) {

        }
    }
}