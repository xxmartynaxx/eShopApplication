import { Entity, ObjectIdColumn, Column, ManyToOne } from "typeorm";
import { IsNumber, Max, Min } from "class-validator";
import { Product } from "./Product";


@Entity()
export class CartItem {
    @ObjectIdColumn()
    id;

    @Column()
    @IsNumber()
    @Min(1)
    @Max(99)
    quantity;

    // Foreign Key na productId
    @ManyToOne(() => Product, (product) => product.cartItems)
    product; 

    @ManyToOne(() => Cart, (cart) => cart.cartItems)
    cart;
}
