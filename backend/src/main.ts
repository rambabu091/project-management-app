import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // Enable CORS for frontend
  app.setGlobalPrefix('api'); // Prefix all routes with /api
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
