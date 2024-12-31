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
    
    // wyciągnie się dane z http (routes layer)?
    async addNewProduct(category, name, descr, sizes, price, stock) {
        // v: sporo do walidacji
        const newProduct = {
            category,
            name,
            descr,
            sizes,
            price,
            stock
        }

        await this.productRepository.save(newProduct);
    }

    async removeProduct(productId) {
        await this.productRepository.delete( {id : productId} );
    }

    // wyciągnie się dane z http (routes layer)?
    // na dzień dobry pola wypełnione starymi info
    // jeśli nietknięte, to pozostają takie jakie były
    async modifyProduct(productId, category, name, descr, sizes, price, stock) {
        // v: sporo do walidacji
        const updates = {};
        updates.category = category;
        updates.name = name;
        updates.description = descr;
        updates.sizesAvailable = sizes;
        updates.price = price;
        updates.stock = stock;

        await this.productRepository.update( {id : productId}, updates);
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