import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './project.entity';
import { ObjectId } from 'mongodb';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
  ) {}

  async create(projectData: Partial<Project>, ownerId: string): Promise<Project> {
    const project = this.projectsRepository.create({ ...projectData, ownerId });
    return this.projectsRepository.save(project);
  }

  async findAll(): Promise<any[]> {
    const projects = await this.projectsRepository.find();
    return projects.map(p => ({ ...p, id: p.id.toString() }));
  }
}
