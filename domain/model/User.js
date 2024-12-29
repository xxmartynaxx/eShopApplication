import { Entity, ObjectIdColumn, Column, OneToOne, OneToMany } from "typeorm";
import { IsEmail, IsNotEmpty, IsString, Length, IsIn } from "class-validator";
import { Cart } from "./Cart";
import { Order } from "./Order";

@Entity()
export class User {
    @ObjectIdColumn() // id obiektu w MongoDB
    id;

    @Column()
    @IsString()
    @IsNotEmpty()
    username;

    @Column()
    @IsEmail()
    email;

    @Column()
    @Length(6, 15)
    password;

    @Column()
    @IsIn(["user", "admin"])
    role;

    @OneToOne(() => Cart, (cart) => cart.user)
    cart;

    @OneToMany(() => Order, (order) => order.user)
    orders;
}
