import { Database } from "../database/databaseConnection.js";
import { Cart } from "../../domain/model/Cart.js";
import { CartItem } from "../../domain/model/CartItem.js";
export class CartRepoInfr {
    constructor() {
        (async () => {
            this.cartRepository = Database.getMongoRepository(Cart);
            this.cartItemRepository = Database.getMongoRepository(CartItem);
        })();
    }
    async createNewCart(userId) {
        const newCart = {
            user: userId
        };
        return await this.cartRepository.save(newCart);
    }
    async getCart(userId) {
        return await this.cartRepository.findOne({
            where: { user: userId }
        });
    }
    async addProductToCart(productId, cartId, quantity) {
        const newCartItem = {
            quantity: quantity,
            product: productId,
            cart: cartId
        };
        return await this.cartItemRepository.save(newCartItem);
    }
    async removeProductFromCart(cartItemId) {
        const result = await this.cartItemRepository.delete({ id: cartItemId });
        return result;
    }
    async changeQuantity(cartItemId, quantity) {
        const updates = { quantity };
        const result = await this.cartItemRepository.update({ id: cartItemId }, updates);
        return result;
    }
    async getCartItemById(cartItemId) {
        return await this.cartItemRepository.findOne({
            where: { id: cartItemId }
        });
    }
    async showAllCartItems(cartId) {
        return await this.cartItemRepository.find({
            where: { cart: cartId }
        });
    }
    async cartSummary(cartId) {
        const cartItems = await this.cartItemRepository.find({
            where: { cart: cartId },
            relations: ["product"]
            // oprócz samego CartItem, wyciągamy też info o produkcie (nazwa, opis, cena, ...)
        });
        if (!cartItems || cartItems.length === 0) {
            return { numOfCartItems: 0, totalCost: 0 };
        }
        const numOfCartItems = cartItems.length;
        // reduce - iteruje przez tablicę i zwraca ostatecznie obliczony akumulator 
        // akumulator - tu: sum, początkowo jest 0
        const totalCost = cartItems.reduce((sum, item) => {
            const productPrice = item.product.price;
            return sum + productPrice * item.quantity;
        }, 0);
        return { numOfCartItems, totalCost };
    }
}
