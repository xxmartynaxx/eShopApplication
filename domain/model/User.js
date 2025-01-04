import { Entity, ObjectIdColumn, Column, OneToOne, OneToMany } from "typeorm";
import { Cart } from "./Cart";
import { Order } from "./Order";

@Entity()
export class User {
    @ObjectIdColumn() // id obiektu w MongoDB
    id;

    @Column()
    email;

    @Column()
    password;

    @Column()
    role;

    // () => Cart  relacja dotyczy User i Cart
    // (cart) => cart.user  w Cart ta relacja jest określona za pomocą pola this.user
    @OneToOne(() => Cart, (cart) => cart.user)
    cart;

    // () => Order  relacja dotyczy User i Order
    // (order) => order.user  w Order ta relacja jest określona za pomocą pola this.user
    @OneToMany(() => Order, (order) => order.user)
    orders;
}
