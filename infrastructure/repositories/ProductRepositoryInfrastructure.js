import { Database } from "../database/databaseConnection";
import { Product } from "../../domain/model/Product";

export class ProductRepoInfr {
    constructor() {
        (async () => {
            this.repository = await Database.getMongoRepository(Product);
        })();
    }

    async getAllProducts() {
        // produkty wyświetlają się automatycznie po odpaleniu serwera
        return await this.repository.find();
    }

    async showProductInfo(productId) {
        // after clicking on the specific product
        return await this.repository.findOne( {id : productId} );
    }

    async getProductByName(productName) {
        // search box
        // v: string
        return await this.repository.findOne( {name : productName} );
    }

    async filterByPrice(minPrice, maxPrice) {
        // type boxes
        // v: positive nums, minPrice <= maxPrice
        return await this.repository.find({
            where : { 
                price : {$gte : minPrice, $lte : maxPrice}
            }
        });
    }

    async filterByCategory(category) {
        // List like the one in the Express Ex2 
        // v: string
        return await this.repository.find({
            where : { category }
        });
    }

    async filterBySize(...sizes) {
        // v: in ["XS", "S", "M", "L", "XL"], 1 <= sizes.length <= 5
        return await this.repository.find({
            where : {
                size : {$in : sizes}
            }
        });
    }

    async sortProductsByPrice(sortingOrder) {
        // v: in ["ASC", "DESC"]
        return await this.repository.find({
            order : { price : sortingOrder }
        });
    }
}