import { Database } from "../database/databaseConnection";
import { User } from "../../domain/model/User";

export class UserRepoInfr {
    constructor() {
        (async () => {
            this.repository = await Database.getMongoRepository(User);
        })();
    }

    // arg przechwytywane z http?
    async logIn(email, password, role) {
        const user = await this.repository.findOne({
            where: {
                email: email,
                password: password,
                role: role
            }
        });

        if (!user) {
            // console.error('Invalid email or password.');
            return null;
            // i powinna się wyświetlić opcja do ponownego zalogowania
        }

        return user;
    }

    async logOut() {
        // ta funkcja nic nie wyciąga z bazy danych
        // będzie przeniesiona do application layer 
        // będzie wyświetlać stronę główną dla niezalogowanych użytkowników
    }

    async createNewUserAccount(email, password) {
        const existingUser = await this.repository.findOne({
            where: { email: email }
        });

        if (existingUser) {
            // console.error(`Account with the email: ${email} already exists.`);
            return null; 
            // i powinna się wyświetlić opcja do normalnego zalogowania
        }

        const newUser = {
            email: email,
            password: password,
            role: "user"
        };

        return await this.repository.save(newUser);
    }

}