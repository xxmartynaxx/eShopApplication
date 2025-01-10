import { Database } from "../database/databaseConnection";
import { User } from "../../domain/model/User";

export class UserRepoInfr {
    constructor() {
        (async () => {
            this.repository = await Database.getMongoRepository(User);
        })();
    }

    async findUserByEmail(email) {
        return await this.repository.findOne({
            where: { email: email }});
    }

    async logIn(email, password, role) {
        return await this.repository.findOne({
            where: {
                email: email,
                password: password,
                role: role
            }
        });
    }

    async createNewUserAccount(email, password) {
        const newUser = {
            email: email,
            password: password,
            role: "user"
        };

        return await this.repository.save(newUser);
    }
}