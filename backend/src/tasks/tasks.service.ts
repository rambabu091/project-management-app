import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task, TaskStatus } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async create(taskData: Partial<Task>, projectId: number): Promise<Task> {
    const task = this.tasksRepository.create({ ...taskData, project: { id: projectId } });
    return this.tasksRepository.save(task);
  }

  async findAll(): Promise<Task[]> {
    return this.tasksRepository.find({ relations: ['project', 'assignee'] });
  }

  async updateStatus(id: number, status: TaskStatus): Promise<Task> {
    const task = await this.tasksRepository.findOne({ where: { id } });
    if (task) {
      task.status = status;
      return this.tasksRepository.save(task);
    }
    throw new Error('Task not found');
  }
}
