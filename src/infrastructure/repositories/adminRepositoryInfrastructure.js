import { Database } from "../database/databaseConnection";
import { User } from "../../domain/model/User";
import { Product } from "../../domain/model/Product";
import { Cart } from "../../domain/model/Cart";
import { Order } from "../../domain/model/Order";

export class AdminRepoInfr {
    constructor() {
        (async () => {
            this.userRepository = await Database.getMongoRepository(User);
            this.productRepository = await Database.getMongoRepository(Product);
            this.cartRepository = await Database.getMongoRepository(Cart);
            this.orderRepository = await Database.getMongoRepository(Order);
        })();
    }
    
    async addNewProduct(category, name, descr, sizes, price, stock) {
        const newProduct = {
            category,
            name,
            descr,
            sizes,
            price,
            stock
        }

        return await this.productRepository.save(newProduct);
    }

    async removeProduct(productId) {
        const result = await this.productRepository.delete( {id : productId} );
        return result.deletedCount;
    }

    async modifyProduct(productId, category, name, description, sizesAvailable, price, stock) {
        const updates = {category, name, description, sizesAvailable, price, stock};
        const result = await this.productRepository.update( {id : productId}, updates);
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