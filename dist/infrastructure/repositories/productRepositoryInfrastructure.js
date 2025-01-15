import { Database } from "../database/databaseConnection.js";
import { Product } from "../../domain/model/Product.js";
export class ProductRepoInfr {
    constructor() {
        (async () => {
            this.productRepository = Database.getMongoRepository(Product);
        })();
    }
    async getAllProducts() {
        return await this.productRepository.find();
    }
    async showProductInfo(productId) {
        return await this.productRepository.findOne({
            where: { id: productId }
        });
    }
    async getProductByName(productName) {
        return await this.productRepository.findOne({
            where: { name: productName }
        });
    }
    async filterByPrice(minPrice, maxPrice) {
        return await this.productRepository.find({
            where: {
                price: { $gte: minPrice, $lte: maxPrice }
            }
        });
    }
    async filterByCategory(category) {
        return await this.productRepository.find({
            where: { category }
        });
    }
    async filterBySize(...sizes) {
        return await this.productRepository.find({
            where: {
                size: { $in: sizes }
            }
        });
    }
    async sortProductsByPrice(sortingOrder) {
        return await this.productRepository.find({
            order: { price: sortingOrder }
        });
    }
}
