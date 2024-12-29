import { Entity, ObjectIdColumn, OneToOne } from "typeorm";
import { IsNotEmpty, IsArray } from "class-validator";
import { CartItem } from "./CartItem";
import { User } from "./User";

@Entity()
export class Cart {
    @ObjectIdColumn()
    id;

    @OneToOne(() => User, (user) => user.cart)
    user;

    @OneToMany(() => CartItem, (cartItem) => cartItem.cart)
    cartItems; 
}
