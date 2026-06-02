import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';

async function bootstrap() {
  console.log('DATABASE_URL?', !!process.env.DATABASE_URL);
  console.log('NODE_ENV?', process.env.NODE_ENV);
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
