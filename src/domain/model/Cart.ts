import { Entity, ObjectIdColumn, Column } from "typeorm";
import { ObjectId } from "mongodb";

@Entity()
export class Cart {
    @ObjectIdColumn()
    id!: ObjectId;

    @Column()
    user!: ObjectId;
}
