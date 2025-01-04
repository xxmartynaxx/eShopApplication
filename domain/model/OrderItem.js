import { Entity, ObjectIdColumn, Column, ManyToOne } from "typeorm";
import { Product } from "./Product";
import { Order } from "./Order";

@Entity()
export class OrderItem {
    @ObjectIdColumn()
    id;

    @Column()
    quantity;

    // relacja zakłada Foreign Key na productId
    // () => Product  relacja dotyczy OrderItem i Product
    // (product) => product.orderItems  w Product ta relacja jest określona za pomocą pola this.orderItems
    @ManyToOne(() => Product, (product) => product.orderItems)
    product;

    // relacja zakłada Foreign Key na orderId
    // () => Order  relacja dotyczy OrderItem i Order
    // (order) => order.orderItems  w Order ta relacja jest określona za pomocą pola this.orderItems
    @ManyToOne(() => Order, (order) => order.orderItems)
    order;
}
