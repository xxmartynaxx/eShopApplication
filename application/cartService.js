import { CartRepoInfr } from "../infrastructure/repositories/cartRepositoryInfrastructure";
import Validator from "../commonComponent/validator";

export class CartService {
    constructor() {
        this.cartRepository = new CartRepoInfr();
    }

    // gdy tworzymy nowe konto dla użytkownika
    async createNewCart(userId) {
        try {
            return await this.cartRepository.createNewCart(userId);
        } 
        
        catch (error) {

        }
    }

    // gdy użytkownik zalogował się na swoje konto
    async getCart(userId) {
        try {
            
        } 
        
        catch (error) {

        }
    }
    
    // quantity zgodna z stock oraz positive num
    async addProductToCart(productId, cartId, quantity) {
        try {
            
        } 
        
        catch (error) {

        }
    }

    async removeProductFromCart(cartItemId) {
        try {
            
        } 
        
        catch (error) {

        }
    }

    // quantity zgodna z stock oraz positive num
    async changeQuantity(cartItemId, quantity) {
        try {
            
        } 
        
        catch (error) {

        }
    }

    async showAllCartItems(cartId) {
        try {
            
        } 
        
        catch (error) {

        }
    }

    async cartSummary(cartId) {
        try {
            
        } 
        
        catch (error) {

        }
    }
}