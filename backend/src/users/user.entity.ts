import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from 'typeorm';
import { Project } from '../projects/project.entity';
import { Task } from '../tasks/task.entity';

export enum Role {
  Admin = 'Admin',
  Member = 'Member',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  passwordHash: string;

  @Column({
    type: 'varchar',
    default: Role.Member,
  })
  role: Role;

  @OneToMany(() => Project, project => project.owner)
  projects: Project[];

  @OneToMany(() => Task, task => task.assignee)
  assignedTasks: Task[];

  @CreateDateColumn()
  createdAt: Date;
}
