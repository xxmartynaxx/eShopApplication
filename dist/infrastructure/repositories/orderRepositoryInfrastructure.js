import { Database } from "../database/databaseConnection.js";
import { Order } from "../../domain/model/Order.js";
import { OrderItem } from "../../domain/model/OrderItem.js";
import { Cart } from "../../domain/model/Cart.js";
import { CartItem } from "../../domain/model/CartItem.js";
import { Product } from "../../domain/model/Product.js";
export class OrderRepoInfr {
    constructor() {
        (async () => {
            this.orderRepository = Database.getMongoRepository(Order);
            this.orderItemRepository = Database.getMongoRepository(OrderItem);
            this.cartRepository = Database.getMongoRepository(Cart);
            this.cartItemRepository = Database.getMongoRepository(CartItem);
            this.productRepository = Database.getMongoRepository(Product);
        })();
    }
    async createOrder(cartId) {
        const cart = await this.cartRepository.findOne({
            where: { id: cartId }
        });
        const cartItems = await this.cartItemRepository.find({
            where: { cart: cartId },
            relations: ["product"]
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
            await this.productRepository.update({ id: item.product.id }, { stock: newStock });
        }
        await this.orderItemRepository.save(orderItems);
        await this.cartItemRepository.deleteMany({ cart: cartId });
        return newOrder;
    }
}
