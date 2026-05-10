import { Controller, Post, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { Role } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  // A helper endpoint for testing to quickly make someone an admin
  @Post('make-admin/:email')
  async makeAdmin(@Param('email') email: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      return { message: 'User not found' };
    }
    return this.usersService.updateRole(user.email, Role.Admin);
  }
}
