import { Entity, ObjectIdColumn, ObjectID, Column, Index } from 'typeorm';

@Entity()
export class Bag {
    @ObjectIdColumn()
    _id?: ObjectID;

    @Column({ nullable: false })
    @Index({ unique: true })
    code: string;

    @Column()
    description: string;
}
