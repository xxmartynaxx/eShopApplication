import { Database } from "../database/databaseConnection.js";
import { User } from "../../domain/model/User.js";
import { Product } from "../../domain/model/Product.js";
import { Cart } from "../../domain/model/Cart.js";
import { CartItem } from "../../domain/model/CartItem.js";
import { Order } from "../../domain/model/Order.js";
import { ObjectId } from "mongodb";
export class AdminRepoInfr {
    constructor() {
        (async () => {
            this.userRepository = Database.getMongoRepository(User);
            this.productRepository = Database.getMongoRepository(Product);
            this.cartRepository = Database.getMongoRepository(Cart);
            this.cartItemRepository = Database.getMongoRepository(CartItem);
            this.orderRepository = Database.getMongoRepository(Order);
        })();
    }
    async addNewProduct(category, name, descr, sizes, price, stock) {
        const newProduct = {
            id: new ObjectId(),
            category: category,
            name: name,
            description: descr,
            sizesAvailable: sizes,
            price: price,
            stock: stock
        };
        return await this.productRepository.save(newProduct);
    }
    async removeProduct(productId) {
        const results = await this.cartItemRepository.deleteMany({ product: productId });
        const result = await this.productRepository.delete({ id: productId });
        return result;
    }
    async modifyProduct(productId, category, name, description, sizesAvailable, price, stock) {
        const productUpdates = { category, name, description, sizesAvailable, price, stock };
        const result = await this.productRepository.update({ id: productId }, productUpdates);
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
}
