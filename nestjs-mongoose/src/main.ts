import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import mongoose from 'mongoose';
import { AppModule } from './app.module';

mongoose.set('debug', true);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      // whitelist: true // Stripping undefined properties from Dto's
      // transform: true, // Transform the Dto fields to defined datatypes
      // forbidNonWhitelisted: true, TODO: refactor endpoints
    }),
  );
  await app.listen(3001);
}
bootstrap();
