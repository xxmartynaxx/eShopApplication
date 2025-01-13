import { Entity, ObjectIdColumn, Column, OneToMany } from "typeorm";
import { CartItem } from "./CartItem";
import { OrderItem } from "./OrderItem";
import { ObjectId } from "mongodb";

@Entity()
export class Product {
    @ObjectIdColumn()
    id!: ObjectId;

    @Column()
    category!: string;

    @Column()
    name!: string;

    @Column()
    description!: string;

    @Column(type => String)
    sizesAvailable!: string[];

    @Column()
    price!: number;

    @Column()
    stock!: number;

    // () => CartItem  relacja dotyczy Product i CartItem
    // (cartItem) => cartItem.product  w CartItem ta relacja jest określona za pomocą pola this.product
    @OneToMany(() => CartItem, (cartItem) => cartItem.product)
    cartItems?: CartItem[];

    // () => OrderItem  relacja dotyczy Product i OrderItem
    // (orderItem) => orderItem.product  w OrderItem ta relacja jest określona za pomocą pola this.product
    @OneToMany(() => OrderItem, (orderItem) => orderItem.product)
    orderItems?: OrderItem[];

}
