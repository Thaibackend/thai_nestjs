import { RoleSystem } from 'src/enum/role';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne } from 'typeorm';
import { Classes } from '../classes/classes.enity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  phone?: string;

  @Column({ nullable: true })
  address?: string;

  @Column({
    type: 'enum',
    enum: RoleSystem,
    default: RoleSystem.STUDENT,
  })
  role: RoleSystem;

  @OneToOne(() => Classes, (cls)=>cls.teacherCreated )  
  classes: Classes;
}