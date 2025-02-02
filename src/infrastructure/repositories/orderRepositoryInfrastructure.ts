import { Database } from "../database/databaseConnection.js";
import { Order } from "../../domain/model/Order.js";
import { OrderItem } from "../../domain/model/OrderItem.js";
import { Cart } from "../../domain/model/Cart.js";
import { CartItem } from "../../domain/model/CartItem.js";
import { Product } from "../../domain/model/Product.js";
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
            where: { _id: cartId }
        });

        const cartItems = await this.cartItemRepository.find({
            where: { cart: cartId }
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

            const product = await this.productRepository.findOne({
                where: { _id: item.product }
            });

            const newStock = product!.stock - item.quantity;
            await this.productRepository.update({ _id: item.product }, { stock: newStock });
        }

        await this.orderItemRepository.save(orderItems);
        await this.cartItemRepository.deleteMany({ cart: cartId });

        return newOrder;
    }
}