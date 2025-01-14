import { Entity, ObjectIdColumn, Column } from "typeorm";
import { ObjectId } from "mongodb";

@Entity()
export class CartItem {
    @ObjectIdColumn()
    id!: ObjectId;

    @Column()
    quantity!: number;

    @Column()
    product!: ObjectId;

    @Column()
    cart!: ObjectId;
}
