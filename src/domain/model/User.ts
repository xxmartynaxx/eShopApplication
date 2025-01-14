import { Entity, ObjectIdColumn, Column } from "typeorm";
import { ObjectId } from "mongodb";

@Entity()
export class User {
    @ObjectIdColumn()
    id!: ObjectId;

    @Column()
    email!: string;

    @Column()
    password!: string;

    @Column()
    role!: string;

    @Column()
    cart!: ObjectId | null;
}
