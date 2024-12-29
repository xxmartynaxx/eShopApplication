import { Entity, ObjectIdColumn, Column, OneToMany } from "typeorm";
import { IsNotEmpty, IsString, IsNumber, Min, IsArray } from "class-validator";
import { CartItem } from "./CartItem";
import { OrderItem } from "./OrderItem";

@Entity()
export class Product {
    @ObjectIdColumn()
    id;

    @Column()
    @IsString()
    category;

    @Column()
    @IsString()
    @IsNotEmpty()
    name;

    @Column()
    @IsString()
    description;

    @Column(type => String)
    @IsArray()
    sizesAvailable;

    @Column()
    @IsNumber()
    @Min(0)
    price;

    @Column()
    @IsNumber()
    @Min(0)
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
