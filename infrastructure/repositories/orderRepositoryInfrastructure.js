import { Database } from "../database/databaseConnection";
import { Order } from "../../domain/model/Order";

export class OrderRepoInfr {
    constructor() {
        (async () => {
            this.repository = await Database.getMongoRepository(Order);
        })();
    }
}