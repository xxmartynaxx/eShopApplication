import { Entity, ObjectIdColumn, Column } from "typeorm";
import { ObjectId } from "mongodb";

@Entity()
export class OrderItem {
    @ObjectIdColumn()
    id!: ObjectId;

    @Column()
    quantity!: number;

    @Column()
    product!: ObjectId;

    @Column()
    order!: ObjectId;
}
