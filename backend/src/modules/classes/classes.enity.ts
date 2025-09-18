import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../users/user.enity";

@Entity()
export  class Classes{
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => User, (user) => user.classes)
    @JoinColumn()
    teacherCreated: User;

    @Column()
    numberStudent: number;

    @Column({ unique: true })
    className: string;
}