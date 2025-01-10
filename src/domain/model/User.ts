import { Entity, ObjectIdColumn, Column, OneToOne, OneToMany } from "typeorm";
import { Cart } from "./Cart";
import { Order } from "./Order";
import { ObjectId } from "mongodb";

@Entity()
export class User {
    @ObjectIdColumn() 
    id! : ObjectId;

    @Column()
    email! : string;

    @Column()
    password! : string;

    @Column()
    role! : string;

    // () => Cart  relacja dotyczy User i Cart
    // (cart) => cart.user  w Cart ta relacja jest określona za pomocą pola this.user
    @OneToOne(() => Cart, (cart) => cart.user)
    cart! : Cart | null;

    // () => Order  relacja dotyczy User i Order
    // (order) => order.user  w Order ta relacja jest określona za pomocą pola this.user
    @OneToMany(() => Order, (order) => order.user)
    orders! : Order[];
}
