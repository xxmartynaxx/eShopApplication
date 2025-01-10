import { Entity, ObjectIdColumn, Column, ManyToOne } from "typeorm";
import { Product } from "./Product";
import { Cart } from "./Cart";
import { ObjectId } from "mongodb";

@Entity()
export class CartItem {
    @ObjectIdColumn()
    id! : ObjectId;

    @Column()
    quantity! : number;

    // relacja zakłada Foreign Key na productId
    // () => Product  relacja dotyczy CartItem i Product
    // (product) => product.cartItems  w Product ta relacja jest określona za pomocą pola this.cartItems
    @ManyToOne(() => Product, (product) => product.cartItems)
    product! : Product; 

    // relacja zakłada Foreign Key na cartId
    // () => Cart  relacja dotyczy CartItem i Cart
    // (cart) => cart.cartItems  w Cart ta relacja jest określona za pomocą pola this.cartItems
    @ManyToOne(() => Cart, (cart) => cart.cartItems)
    cart! : Cart;
}
