import { Entity, Column, ObjectIdColumn, CreateDateColumn } from 'typeorm';
import { ObjectId } from 'mongodb';

export enum TaskStatus {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

@Entity()
export class Task {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({
    type: 'varchar',
    default: TaskStatus.TODO,
  })
  status: TaskStatus;

  @Column()
  projectId: string; // Storing the string ID of the Project

  @Column({ nullable: true })
  assigneeId: string; // Storing the string ID of the User

  @CreateDateColumn()
  createdAt: Date;
}
