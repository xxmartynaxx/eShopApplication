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

    // produkty mogą występować w wielu koszykach i zamówieniach
    @OneToMany(() => CartItem, (cartItem) => cartItem.product)
    cartItems;

    @OneToMany(() => OrderItem, (orderItem) => orderItem.product)
    orderItems; 

}
