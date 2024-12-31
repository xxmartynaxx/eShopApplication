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
        // gdy tworzymy nowe konto dla użytkownika
        const newCart = {
            user : userId
        }
        return await this.cartRepository.save(newCart);
    }

    async getCart(userId) {
        // gdy użytkownik zalogował się na swoje konto
        return await this.cartRepository.findOne({
            where : {user : userId}
        });
    }

    async addProductToCart(productId, cartId, quantity) {
        // quantity zgodna z stock oraz positive num
        const newCartItem = {
            quantity : quantity,
            product : productId,
            cart : cartId
        }
        await this.cartItemRepository.save(newCartItem)
    }

    async removeProductFromCart(cartItemId) {
        await this.cartItemRepository.delete( {id : cartItemId} );
    }

    async changeQuantity(cartItemId, newQuantity) {
        // quantity zgodna z stock oraz positive num
        const updates = {};
        updates.quantity = newQuantity;

        await this.cartItemRepository.update( {id : cartItemId}, updates);
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