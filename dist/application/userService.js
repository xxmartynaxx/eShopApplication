import { UserRepoInfr } from "../infrastructure/repositories/userRepositoryInfrastructure.js";
import Validator from "../commonComponent/validator.js";
export class UserService {
    constructor() {
        this.userRepository = new UserRepoInfr();
    }
    // arg przechwytywane z http?
    // jeśli błędne dane to powinna się wyświetlić opcja do ponownego zalogowania
    async logIn(email, password, role) {
        try {
            if (!Validator.isEmail(email) || !Validator.isLengthRight(password) ||
                !Validator.isRoleRight(role)) {
                return { success: false, message: "Invalid login details provided" };
            }
            const user = await this.userRepository.logIn(email, password, role);
            return user
                ? { success: true, data: user }
                : { success: false, message: "User not found" };
        }
        catch (error) {
            console.error("Error during login:", error);
            return { success: false, message: "Failed to log in" };
        }
    }
    async logOut() {
        // będzie wyświetlać stronę główną dla niezalogowanych użytkowników
    }
    async createNewUserAccount(email, password) {
        try {
            if (!Validator.isEmail(email) || !Validator.isLengthRight(password)) {
                return { success: false, message: "Invalid email or password format" };
            }
            const existingUser = await this.userRepository.findUserByEmail(email);
            if (existingUser) {
                // powinna wyświetlić się strona do normalnego zalogowania
                return { success: false, message: `User with email ${email} already exists` };
            }
            const newUser = await this.userRepository.createNewUserAccount(email, password);
            return newUser
                ? { success: true, data: newUser }
                : { success: false, message: "User not created" };
        }
        catch (error) {
            console.error("Error creating new account:", error);
            return { success: false, message: "Failed to create new account" };
        }
    }
}
