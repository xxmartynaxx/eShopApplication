import { Database } from "../database/databaseConnection.js";
import { User } from "../../domain/model/User.js";
import { Product } from "../../domain/model/Product.js";
import { Cart } from "../../domain/model/Cart.js";
import { CartItem } from "../../domain/model/CartItem.js";
import { Order } from "../../domain/model/Order.js";
import { MongoRepository } from "typeorm";
import { ObjectId } from "mongodb";

export class AdminRepoInfr {

    private userRepository!: MongoRepository<User>;
    private productRepository!: MongoRepository<Product>;
    private cartRepository!: MongoRepository<Cart>;
    private cartItemRepository!: MongoRepository<CartItem>;
    private orderRepository!: MongoRepository<Order>;

    constructor() {
        (async () => {
            this.userRepository = Database.getMongoRepository(User);
            this.productRepository = Database.getMongoRepository(Product);
            this.cartRepository = Database.getMongoRepository(Cart);
            this.cartItemRepository = Database.getMongoRepository(CartItem);
            this.orderRepository = Database.getMongoRepository(Order);
        })();
    }

    async addNewProduct(category: string, name: string, descr: string, size: string,
        price: number, stock: number) {
        const newProduct: Product = {
            category: category,
            name: name,
            description: descr,
            size: size,
            price: price,
            stock: stock
        }

        return await this.productRepository.save(newProduct);
    }

    async removeProduct(productId: ObjectId) {
        const results = await this.cartItemRepository.deleteMany({ product: productId });
        const result = await this.productRepository.delete({ _id: productId });
        return result;
    }

    async modifyProduct(productId: ObjectId, category: string, name: string, description: string,
        size: string, price: number, stock: number) {

        if (stock === 0) {
            return this.removeProduct(productId);
        }

        const productUpdates = { category, name, description, size, price, stock };
        const result = await this.productRepository.update({ _id: productId }, productUpdates);

        const cartItems = await this.cartItemRepository.find({ product: productId });

        for (var cartItem of cartItems) {
            if (stock < cartItem.quantity) {
                await this.cartItemRepository.update({ id: cartItem.id }, { quantity: stock });
            }
        }    

        return result;
    }

    async getAllUsers() {
        return await this.userRepository.find();
    }

    async getAllCarts() {
        return await this.cartRepository.find();
    }

    async getAllOrders() {
        return await this.orderRepository.find();
    }

    async getAllProducts() {
        return await this.productRepository.find();
    }
}