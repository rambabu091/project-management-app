import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProjectsModule } from './projects/projects.module';
import { TasksModule } from './tasks/tasks.module';
import { User } from './users/user.entity';
import { Project } from './projects/project.entity';
import { Task } from './tasks/task.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: (function() {
        if (!process.env.DATABASE_URL && process.env.NODE_ENV === 'production') {
          console.error('DATABASE_URL is missing in production environment!');
        }
        return process.env.DATABASE_URL || 'mongodb://localhost:27017/project_management';
      })(),
      synchronize: true, // Auto-create collections
      entities: [User, Project, Task],
    }),
    AuthModule, 
    UsersModule, 
    ProjectsModule, 
    TasksModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
