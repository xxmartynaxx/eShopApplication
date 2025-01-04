import { Entity, ObjectIdColumn, Column, OneToMany } from "typeorm";
import { CartItem } from "./CartItem";
import { OrderItem } from "./OrderItem";

@Entity()
export class Product {
    @ObjectIdColumn()
    id;

    @Column()
    category;

    @Column()
    name;

    @Column()
    description;

    @Column(type => String)
    sizesAvailable;

    @Column()
    price;

    @Column()
    stock;

    // () => CartItem  relacja dotyczy Product i CartItem
    // (cartItem) => cartItem.product  w CartItem ta relacja jest określona za pomocą pola this.product
    @OneToMany(() => CartItem, (cartItem) => cartItem.product)
    cartItems;

    // () => OrderItem  relacja dotyczy Product i OrderItem
    // (orderItem) => orderItem.product  w OrderItem ta relacja jest określona za pomocą pola this.product
    @OneToMany(() => OrderItem, (orderItem) => orderItem.product)
    orderItems; 

}
