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

    @ManyToOne(() => User, (user) => user.orders)
    user;

    @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
    orderItems;
}
