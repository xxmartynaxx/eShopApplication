import { Database } from "../database/databaseConnection";
import { User } from "../../domain/model/User";

export class UserRepoInfr {
    constructor() {
        (async () => {
            this.repository = await Database.getMongoRepository(User);
        })();
    }
}