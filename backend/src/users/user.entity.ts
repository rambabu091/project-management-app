import { Entity, Column, ObjectIdColumn, CreateDateColumn } from 'typeorm';
import { ObjectId } from 'mongodb';

export enum Role {
  Admin = 'Admin',
  Member = 'Member',
}

@Entity()
export class User {
  @ObjectIdColumn()
  id: ObjectId;

  @Column({ unique: true })
  email: string;

  @Column()
  passwordHash: string;

  @Column({
    type: 'varchar',
    default: Role.Member,
  })
  role: Role;

  @CreateDateColumn()
  createdAt: Date;
}
