import { Entity, ObjectIdColumn, OneToOne, OneToMany } from "typeorm";
import { CartItem } from "./CartItem";
import { User } from "./User";

@Entity()
export class Cart {
    @ObjectIdColumn()
    id;

    // () => User  relacja dotyczy Cart i User
    // (user) => user.cart  w User ta relacja jest określona za pomocą pola this.cart
    @OneToOne(() => User, (user) => user.cart)
    user;

    // () => CartItem  relacja dotyczy Cart i CartItem
    // ((cartItem) => cartItem.cart  w CartItem ta relacja jest określona za pomocą pola this.cart
    @OneToMany(() => CartItem, (cartItem) => cartItem.cart)
    cartItems; 
}
