import { Entity, ObjectIdColumn, Column } from "typeorm";
import { ObjectId } from "mongodb";

@Entity()
export class Order {
    @ObjectIdColumn()
    id!: ObjectId;

    @Column()
    status!: string;

    @Column()
    orderDate!: Date;

    @Column()
    user!: ObjectId;
}
