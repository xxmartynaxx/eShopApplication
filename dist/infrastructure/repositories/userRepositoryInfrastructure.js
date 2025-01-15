import { Database } from "../database/databaseConnection.js";
import { User } from "../../domain/model/User.js";
import { ObjectId } from "mongodb";
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
            id: new ObjectId(),
            email: email,
            password: password,
            role: "user"
        };
        return await this.userRepository.save(newUser);
    }
}
