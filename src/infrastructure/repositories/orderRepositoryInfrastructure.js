import { Database } from "../database/databaseConnection";
import { Order } from "../../domain/model/Order";
import { OrderItem } from "../../domain/model/OrderItem";
import { Cart } from "../../domain/model/Cart";
import { CartItem } from "../../domain/model/CartItem";
import { Product } from "../../domain/model/Product";

export class OrderRepoInfr {
    constructor() {
        (async () => {
            this.orderRepository = await Database.getMongoRepository(Order);
            this.orderItemRepository = await Database.getMongoRepository(OrderItem);
            this.cartRepository = await Database.getMongoRepository(Cart);
            this.cartItemRepository = await Database.getMongoRepository(CartItem);
            this.productRepository = await Database.getMongoRepository(Product);
        })();
    }

    async createOrder(cartId) {

        const cart = await this.cartRepository.findOne({
            where : { id : cartId }
        });

        const cartItems = await this.cartItemRepository.find({
            where : { cart : cartId },
            relations : ["product"]
        });        

        // skoro koszyk jest pusty, to nie ma jak złożyć zamówienia
        if (cartItems.length == 0) {
            return null;
        }
        
        const newOrder = await this.orderRepository.save({
            status: "in magazine",
            orderDate: new Date(),
            user: cart.user
        });

        // przetwarzanie elementów koszyka na elementy zamówienia
        const orderItems = cartItems.map((item) => ({
            quantity: item.quantity,
            product: item.product,
            order: newOrder.id, // powiązanie z nowym zamówieniem
        }));

        for (let item of cartItems) {
            const newStock = item.product.stock - item.quantity;
            await this.productRepository.update({ id : item.product.id }, { stock : newStock });
        }     

        await this.orderItemRepository.save(orderItems);
        await this.cartItemRepository.deleteMany({ cart : cartId });

        return newOrder;

    }

}