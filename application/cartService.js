import { CartRepoInfr } from "../infrastructure/repositories/cartRepositoryInfrastructure";
import { ProductRepoInfr } from "../infrastructure/repositories/productRepositoryInfrastructure";
import Validator from "../commonComponent/validator";

export class CartService {
    constructor() {
        this.cartRepository = new CartRepoInfr();
        this.producRepository = new ProductRepoInfr();
    }

    // gdy tworzymy nowe konto dla użytkownika
    async createNewCart(userId) {
        try {
            if (Validator.isEmpty(userId)) {
                return { success: false, message: "Invalid user ID provided" };
            }

            const cart = await this.cartRepository.createNewCart(userId);
            return { success: true, data: cart };
        }

        catch (error) {
            console.error("Error creating new cart:", error);
            return { success: false, message: "Failed to create new cart" };
        }
    }

    // gdy użytkownik zalogował się na swoje konto
    async getCart(userId) {
        try {
            if (Validator.isEmpty(userId)) {
                return { success: false, message: "Invalid user ID provided" };
            }

            const cart = await this.cartRepository.getCart(userId);
            return { success: true, data: cart };
        }

        catch (error) {
            console.error("Error fetching cart:", error);
            return { success: false, message: "Failed to fetch cart" };
        }
    }

    // quantity zgodna z stock oraz positive num
    async addProductToCart(productId, cartId, quantity) {
        try {
            if (Validator.isEmpty(productId) || Validator.isEmpty(cartId)) {
                return { success: false, message: "Invalid product ID or cart ID provided" };
            }

            const product = await this.producRepository.showProductInfo(productId);
            if (product.stock < quantity || !Validator.isPositiveNumber(quantity)) {
                return { success: false, message: "Quantity must be greater than 0 and not greater than stock" };
            }

            const productAdded = await this.cartRepository.addProductToCart(productId, cartId, quantity);
            return { success: true, data: productAdded };
        }

        catch (error) {
            console.error("Error adding product to cart:", error);
            return { success: false, message: "Failed to add product to cart" };
        }
    }

    async removeProductFromCart(cartItemId) {
        try {
            if (Validator.isEmpty(cartItemId)) {
                return { success: false, message: "Invalid cart item ID provided" };
            }

            const result = await this.cartRepository.removeProductFromCart(cartItemId);
            if (result.affected === 0) {
                return { success: false, message: "Product not found or not removed from cart" };
            }

            return { success: true, message: "Product removed from cart successfully" };
        }

        catch (error) {
            console.error("Error removing product from cart:", error);
            return { success: false, message: "Failed to remove product from cart" };
        }
    }

    // quantity zgodna z stock oraz positive num
    async changeQuantity(cartItemId, quantity) {
        try {
            if (Validator.isEmpty(cartItemId)) {
                return { success: false, message: "Invalid cart item ID provided" };
            }

            const cartItem = await this.cartRepository.getCartItemById(cartItemId);
            const productId = cartItem.product.id;

            const product = await this.producRepository.showProductInfo(productId);
            if (product.stock < quantity || !Validator.isPositiveNumber(quantity)) {
                return { success: false, message: "Quantity must be greater than 0 and not greater than stock" };
            }

            const productChanged = await this.cartRepository.changeQuantity(cartItemId, quantity);
            return { success: true, data: productChanged };
        }

        catch (error) {
            console.error("Error changing quantity of cart item:", error);
            return { success: false, message: "Failed to change cart item quantity" };
        }
    }

    async showAllCartItems(cartId) {
        try {
            if (Validator.isEmpty(cartId)) {
                return { success: false, message: "Invalid cart ID provided" };
            }

            const items = await this.cartRepository.showAllCartItems(cartId);
            if (items.length === 0) {
                return { success: false, message: "No items found in the cart" };
            }

            return { success: true, data: items };
        }

        catch (error) {
            console.error("Error fetching cart items:", error);
            return { success: false, message: "Failed to fetch cart items" };
        }
    }

    async cartSummary(cartId) {
        try {
            if (Validator.isEmpty(cartId)) {
                return { success: false, message: "Invalid cart ID provided" };
            }

            const { numOfCartItems, totalCost } = await this.cartRepository.cartSummary(cartId);
            return { success: true, data: { numOfCartItems, totalCost } };
        }

        catch (error) {
            console.error("Error summarizing cart:", error);
            return { success: false, message: "Failed to get cart summary" };
        }
    }
}