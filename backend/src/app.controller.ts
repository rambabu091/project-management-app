import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('health')
  async getHealth() {
    try {
      // Try to perform a simple DB operation
      await this.appService.checkDatabase();
      return { status: 'ok', database: 'connected' };
    } catch (err) {
      return { status: 'error', database: 'disconnected', message: err.message };
    }
  }
}
