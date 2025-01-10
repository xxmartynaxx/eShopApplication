import { Database } from "../database/databaseConnection";
import { Product } from "../../domain/model/Product";

export class ProductRepoInfr {
    constructor() {
        (async () => {
            this.repository = await Database.getMongoRepository(Product);
        })();
    }

    async getAllProducts() {
        return await this.repository.find();
    }

    async showProductInfo(productId) {
        return await this.repository.findOne( {id : productId} );
    }

    async getProductByName(productName) {
        return await this.repository.findOne( {name : productName} );
    }

    async filterByPrice(minPrice, maxPrice) {
        return await this.repository.find({
            where : { 
                price : {$gte : minPrice, $lte : maxPrice}
            }
        });
    }

    async filterByCategory(category) {
        return await this.repository.find({
            where : { category }
        });
    }

    async filterBySize(...sizes) {
        return await this.repository.find({
            where : {
                size : {$in : sizes}
            }
        });
    }

    async sortProductsByPrice(sortingOrder) {
        return await this.repository.find({
            order : { price : sortingOrder }
        });
    }
}