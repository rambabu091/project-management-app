import * as dotenv from 'dotenv';
dotenv.config();

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

// For local development
if (process.env.NODE_ENV !== 'production') {
  bootstrap().then(app => app.listen(3000, () => console.log('Local Server running on port 3000')));
}

// For Vercel Serverless
export default async function (req: any, res: any) {
  const app = await bootstrap();
  return app(req, res);
}
