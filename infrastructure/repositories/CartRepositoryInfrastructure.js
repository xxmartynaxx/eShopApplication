import { Database } from "../database/databaseConnection";
import { Cart } from "../../domain/model/Cart";
import { CartItem } from "../../domain/model/CartItem";

export class CartRepoInfr {
    constructor() {
        (async () => {
            this.cartRepository = await Database.getMongoRepository(Cart);
            this.cartItemRepository = await Database.getMongoRepository(CartItem);
        })();
    }

    async createNewCart(userId) {
        const newCart = {
            user : userId
        }
        return await this.cartRepository.save(newCart);
    }

    async getCart(userId) {
        return await this.cartRepository.findOne({
            where : {user : userId}
        });
    }

    async addProductToCart(productId, cartId, quantity) {
        const newCartItem = {
            quantity : quantity,
            product : productId,
            cart : cartId
        }
        return await this.cartItemRepository.save(newCartItem)
    }

    async removeProductFromCart(cartItemId) {
        const result = await this.cartItemRepository.delete( {id : cartItemId} );
        return result.deletedCount;
    }

    async changeQuantity(cartItemId, quantity) {
        const updates = {quantity};
        const result = await this.cartItemRepository.update( {id : cartItemId}, updates);
        return result;
    }

    async showAllCartItems(cartId) {
        return await this.cartItemRepository.find({
            where : { cart : cartId }
        });
    }

    async cartSummary(cartId) {
        const cartItems = await this.cartItemRepository.find({
            where : { cart : cartId },
            relations : ["product"]
            // oprócz samego CartItem, wyciągamy też info o produkcie (nazwa, opis, cena, ...)
        });

        const numOfCartItems = cartItems.length;

        // reduce - iteruje przez tablicę i zwraca ostatecznie obliczony akumulator 
        // akumulator - tu: sum, początkowo jest 0
        const totalCost = await cartItems.reduce((sum, item) => {
            const productPrice = item.product.price;
            return sum + productPrice * item.quantity;
        }, 0);

        return { numOfCartItems, totalCost };
    }
}