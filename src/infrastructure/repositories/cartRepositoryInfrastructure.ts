import { Database } from "../database/databaseConnection.js";
import { Cart } from "../../domain/model/Cart.js";
import { CartItem } from "../../domain/model/CartItem.js";
import { Product } from "../../domain/model/Product.js";
import { MongoRepository } from "typeorm";
import { ObjectId } from "mongodb";

export class CartRepoInfr {

    private cartRepository!: MongoRepository<Cart>;
    private cartItemRepository!: MongoRepository<CartItem>;
    private productRepository!: MongoRepository<Product>;

    constructor() {
        (async () => {
            this.cartRepository = Database.getMongoRepository(Cart);
            this.cartItemRepository = Database.getMongoRepository(CartItem);
            this.productRepository = Database.getMongoRepository(Product);
        })();
    }

    async createNewCart(userId: ObjectId) {
        const newCart = {
            user: userId
        }
        return await this.cartRepository.save(newCart);
    }

    async getCart(userId: ObjectId) {
        return await this.cartRepository.findOne({
            where: { user: userId }
        });
    }

    async addProductToCart(productId: ObjectId, cartId: ObjectId, quantity: number) {
        const newCartItem = {
            quantity: quantity,
            product: productId,
            cart: cartId
        }
        return await this.cartItemRepository.save(newCartItem)
    }

    async removeProductFromCart(cartItemId: ObjectId) {
        const result = await this.cartItemRepository.delete({ id: cartItemId });
        return result;
    }

    async changeQuantity(cartItemId: ObjectId, quantity: number) {
        const updates = { quantity };
        const result = await this.cartItemRepository.update({ id: cartItemId }, updates);
        return result;
    }

    async getCartItemById(cartItemId: ObjectId) {
        return await this.cartItemRepository.findOne({
            where: { _id: cartItemId }
        });
    }

    async showAllCartItems(cartId: ObjectId) {
        return await this.cartItemRepository.find({
            where: { cart: cartId }
        });
    }

    async cartSummary(cartId: ObjectId) {
        const cartItems = await this.cartItemRepository.find({
            where: { cart: cartId }
        });

        if (!cartItems || cartItems.length === 0) {
            return { numOfCartItems: 0, totalCost: 0 };
        }

        const numOfCartItems = cartItems.length;

        var totalCost = 0;

        for (let item of cartItems) {
            const product = await this.productRepository.findOne({
                where: { _id: item.product }
            });
            totalCost = totalCost + (product!.price) * item.quantity;
        }

        return { numOfCartItems, totalCost };
    }
}