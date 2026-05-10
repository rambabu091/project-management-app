import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, Role } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (!user) return null;
    return { ...user, id: user.id.toString() } as any;
  }

  async create(userData: Partial<User>): Promise<User> {
    const user = this.usersRepository.create(userData);
    const saved = await this.usersRepository.save(user);
    return { ...saved, id: saved.id.toString() } as any;
  }

  async updateRole(email: string, role: Role): Promise<User | null> {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (user) {
      user.role = role;
      const saved = await this.usersRepository.save(user);
      return { ...saved, id: saved.id.toString() } as any;
    }
    return null;
  }
}
