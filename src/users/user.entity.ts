import { AfterInsert, AfterRemove, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @AfterInsert()
    logInsert() {
        console.log('Inserted user with', this.id)
    }

    @AfterRemove()
    logUpdate() {
        console.log('Updated user with id', this.id)
    }

    @AfterRemove()
    logRemove() {
        console.log('After remove', this.id)
    }
}