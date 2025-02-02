import { UserRepoInfr } from "../infrastructure/repositories/userRepositoryInfrastructure.js";
import Validator from "../commonComponent/validator.js";
import { ObjectId } from "mongodb";
import { CartRepoInfr } from "../infrastructure/repositories/cartRepositoryInfrastructure.js";

export class UserService {

    private userRepository: UserRepoInfr;
    private cartRepository: CartRepoInfr;

    constructor() {
        this.userRepository = new UserRepoInfr();
        this.cartRepository = new CartRepoInfr();
    }

    async logIn(email: string, password: string, role: string) {
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
            
    async createNewUserAccount(email: string, password: string) {
        try {
            if (!Validator.isEmail(email) || !Validator.isLengthRight(password)) {
                    return { success: false, message: "Invalid email or password format" };
                }
            
            const existingUser = await this.userRepository.findUserByEmail(email);

            if (existingUser) {
                return { success: false, message: `User with email ${email} already exists` };
            }

            const newUser = await this.userRepository.createNewUserAccount(email, password);
            const newCart = await this.cartRepository.createNewCart(new ObjectId(newUser._id));

            await this.userRepository.modifyUserData(newUser, new ObjectId(newCart.id));

            return newUser
                ? { success: true, data: newUser }
                : { success: false, message: "User not created" };
        } 
        
        catch (error) {
            console.error("Error creating new account:", error);
            return { success: false, message: "Failed to create new account" };
        }
    }

    async getUserRole(userId: string) {
        try {
            if (!ObjectId.isValid(userId)) {
                return { success: false, message: "Please log in first" };
            }

            const role = await this.userRepository.fetchUserRoleById(new ObjectId(userId));

            if (!role) {
                return { success: false, message: "User not found" };
            }

            return { success: true, role: role };

        } catch (error) {
            console.error("Error retrieving user role:", error);
            return { success: false, message: "Database query failed" };
        }
    }
}