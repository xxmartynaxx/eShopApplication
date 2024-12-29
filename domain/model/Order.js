import { Entity, ObjectIdColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { IsDate, IsIn } from "class-validator";
import { OrderItem } from "./OrderItem";
import { User } from "./User";

@Entity()
export class Order {
    @ObjectIdColumn()
    id;

    @Column()
    @IsIn(["shipped", "delivered", "canceled"])
    status;

    @Column()
    @IsDate()
    orderDate;

    // relacja zakłada Foreign Key na userId
    // () => User  relacja dotyczy Order i User
    // (user) => user.orders  w User ta relacja jest określona za pomocą pola this.orders
    @ManyToOne(() => User, (user) => user.orders)
    user;

    // () => OrderItem  relacja dotyczy Order i OrderItem
    // (orderItem) => orderItem.order  w OrderItem ta relacja jest określona za pomocą pola this.order
    @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
    orderItems;
}
