import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';

let cachedApp: any;

async function bootstrap() {
  if (!cachedApp) {
    const expressApp = express();
    const app = await NestFactory.create(AppModule, new ExpressAdapter(expressApp));
    app.enableCors();
    app.setGlobalPrefix('api');
    await app.init();
    cachedApp = expressApp;
  }
  return cachedApp;
}

export default async function (req: any, res: any) {
  const app = await bootstrap();
  return app(req, res);
}
