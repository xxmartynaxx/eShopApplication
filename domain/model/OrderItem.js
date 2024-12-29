import { Entity, ObjectIdColumn, Column, ManyToOne } from "typeorm";
import { IsNumber, Max, Min } from "class-validator";
import { Product } from "./Product";
import { Order } from "./Order";

@Entity()
export class OrderItem {
    @ObjectIdColumn()
    id;

    @Column()
    @IsNumber()
    @Min(1)
    @Max(99)
    quantity;

    @ManyToOne(() => Product, (product) => product.orderItems)
    product;

    @ManyToOne(() => Order, (order) => order.orderItems)
    order;
}
