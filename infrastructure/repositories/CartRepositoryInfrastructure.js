import { Database } from "../database/databaseConnection";
import { Cart } from "../../domain/model/Cart";

export class CartRepoInfr {
    constructor() {
        (async () => {
            this.repository = await Database.getMongoRepository(Cart);
        })();
    }
}