import { Database } from "../database/databaseConnection.js";
import { User } from "../../domain/model/User.js";
import { MongoRepository } from "typeorm";
import { ObjectId } from "mongodb";

export class UserRepoInfr {

    private userRepository!: MongoRepository<User>;

    constructor() {
        (async () => {
            this.userRepository = Database.getMongoRepository(User);
        })();
    }

    async findUserByEmail(email: string) {
        return await this.userRepository.findOne({
            where: { email: email }
        });
    }

    async logIn(email: string, password: string, role: string) {
        return await this.userRepository.findOne({
            where: {
                email: email,
                password: password,
                role: role
            }
        });
    }

    async createNewUserAccount(email: string, password: string) {
        const newUser = {
            email: email,
            password: password,
            role: "user"
        };

        return await this.userRepository.save(newUser);
    }

    async fetchUserRoleById(userId: ObjectId) {
        const user = await this.userRepository.findOne({
            where: { _id: userId }
        });
        return user ? user.role : null;
    }
}