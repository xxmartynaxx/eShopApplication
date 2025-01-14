import { Database } from "../database/databaseConnection.js";
import { User } from "../../domain/model/User.js";
export class UserRepoInfr {
    constructor() {
        (async () => {
            this.userRepository = Database.getMongoRepository(User);
        })();
    }
    async findUserByEmail(email) {
        return await this.userRepository.findOne({
            where: { email: email }
        });
    }
    async logIn(email, password, role) {
        return await this.userRepository.findOne({
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
        return await this.userRepository.save(newUser);
    }
}
