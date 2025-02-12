import { Database } from "../database/databaseConnection.js";
import { Product } from "../../domain/model/Product.js";
import { MongoRepository } from "typeorm";
import { ObjectId } from "mongodb";

export class ProductRepoInfr {

    private productRepository!: MongoRepository<Product>;

    constructor() {
        (async () => {
            this.productRepository = Database.getMongoRepository(Product);
        })();
    }

    async getAllProducts() {
        return await this.productRepository.find();
    }

    async showProductInfo(productId: ObjectId) {
        return await this.productRepository.findOne({
            where: { _id: productId }
        });
    }

    async getProductByName(productName: string) {
        return await this.productRepository.findOne({
            where: { name: productName }
        });
    }

    async filterByPrice(minPrice: number, maxPrice: number) {
        return await this.productRepository.find({
            where: {
                price: { $gte: minPrice, $lte: maxPrice }
            }
        });
    }

    async filterByCategory(category: string) {
        return await this.productRepository.find({
            where: { category }
        });
    }

    async filterBySize(size: string) {
        return await this.productRepository.find({
            where: { size }
        });
    }

    async sortProductsByPrice(sortingOrder: string) {
        return await this.productRepository.find({
            order: { price: sortingOrder }
        });
    }
}