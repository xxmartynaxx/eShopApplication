import { Database } from "../database/databaseConnection";
import { User } from "../../domain/model/User";
import { Product } from "../../domain/model/Product";
import { Cart } from "../../domain/model/Cart";
import { Order } from "../../domain/model/Order";
import { MongoRepository } from "typeorm";
import { ObjectId } from "mongodb";

export class AdminRepoInfr {

    private userRepository!: MongoRepository<User>;
    private productRepository!: MongoRepository<Product>;
    private cartRepository!: MongoRepository<Cart>;
    private orderRepository!: MongoRepository<Order>;

    constructor() {
        (async () => {
            this.userRepository = Database.getMongoRepository(User);
            this.productRepository = Database.getMongoRepository(Product);
            this.cartRepository = Database.getMongoRepository(Cart);
            this.orderRepository = Database.getMongoRepository(Order);
        })();
    }

    async addNewProduct(category: string, name: string, descr: string, sizes: string[],
        price: number, stock: number) {
        const newProduct: Product = {
            id: new ObjectId(),
            category: category,
            name: name,
            description: descr,
            sizesAvailable: sizes,
            price: price,
            stock: stock
        }

        return await this.productRepository.save(newProduct);
    }

    async removeProduct(productId: ObjectId) {
        const result = await this.productRepository.delete({ id: productId });
        return result;
    }

    async modifyProduct(productId: ObjectId, category: string, name: string, description: string,
        sizesAvailable: string[], price: number, stock: number) {
        const updates = { category, name, description, sizesAvailable, price, stock };
        const result = await this.productRepository.update({ id: productId }, updates);
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