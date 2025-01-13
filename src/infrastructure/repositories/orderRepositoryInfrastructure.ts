import { Database } from "../database/databaseConnection";
import { Order } from "../../domain/model/Order";
import { OrderItem } from "../../domain/model/OrderItem";
import { Cart } from "../../domain/model/Cart";
import { CartItem } from "../../domain/model/CartItem";
import { Product } from "../../domain/model/Product";
import { MongoRepository } from "typeorm";
import { ObjectId } from "mongodb";

export class OrderRepoInfr {

    private orderRepository!: MongoRepository<Order>;
    private orderItemRepository!: MongoRepository<OrderItem>;
    private cartRepository!: MongoRepository<Cart>;
    private cartItemRepository!: MongoRepository<CartItem>;
    private productRepository!: MongoRepository<Product>;

    constructor() {
        (async () => {
            this.orderRepository = Database.getMongoRepository(Order);
            this.orderItemRepository = Database.getMongoRepository(OrderItem);
            this.cartRepository = Database.getMongoRepository(Cart);
            this.cartItemRepository = Database.getMongoRepository(CartItem);
            this.productRepository = Database.getMongoRepository(Product);
        })();
    }

    async createOrder(cartId: ObjectId) {

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
            user: cart!.user
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