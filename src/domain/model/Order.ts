import { Entity, ObjectIdColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { OrderItem } from "./OrderItem";
import { User } from "./User";
import { ObjectId } from "mongodb";

@Entity()
export class Order {
    @ObjectIdColumn()
    id! : ObjectId;

    @Column()
    status! : string;

    // new Date() w trakcie złożenia zamówienia
    @Column()
    orderDate! : Date;

    // relacja zakłada Foreign Key na userId
    // () => User  relacja dotyczy Order i User
    // (user) => user.orders  w User ta relacja jest określona za pomocą pola this.orders
    @ManyToOne(() => User, (user) => user.orders)
    user! : User;

    // () => OrderItem  relacja dotyczy Order i OrderItem
    // (orderItem) => orderItem.order  w OrderItem ta relacja jest określona za pomocą pola this.order
    @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
    orderItems? : OrderItem[];
}
