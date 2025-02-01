import { Entity, ObjectIdColumn, Column } from "typeorm";
import { ObjectId } from "mongodb";

@Entity()
export class Product {
    @ObjectIdColumn()
    _id?: ObjectId;

    @Column()
    category!: string;

    @Column()
    name!: string;

    @Column()
    description!: string;

    @Column()
    sizesAvailable!: string[];

    @Column()
    price!: number;

    @Column()
    stock!: number;
}
