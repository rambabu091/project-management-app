import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task, TaskStatus } from './task.entity';
import { Project } from '../projects/project.entity';
import { ObjectId } from 'mongodb';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
  ) {}

  async create(taskData: Partial<Task>, projectId: string): Promise<Task> {
    const task = this.tasksRepository.create({ ...taskData, projectId });
    return this.tasksRepository.save(task);
  }

  async findAll(): Promise<any[]> {
    const tasks = await this.tasksRepository.find();
    const projects = await this.projectsRepository.find();
    
    return tasks.map(task => {
      const project = projects.find(p => p.id.toString() === task.projectId);
      return { 
        ...task, 
        id: task.id.toString(), // convert objectid to string for frontend
        project: project ? { ...project, id: project.id.toString() } : null 
      };
    });
  }

  async updateStatus(id: string, status: TaskStatus): Promise<Task> {
    const task = await this.tasksRepository.findOne({ where: { _id: new ObjectId(id) } as any });
    if (task) {
      task.status = status;
      return this.tasksRepository.save(task);
    }
    throw new Error('Task not found');
  }
}
