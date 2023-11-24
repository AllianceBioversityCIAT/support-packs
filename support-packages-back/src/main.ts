import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

/**
 * Boots up the application by creating a NestFactory instance,
 * enabling CORS, and listening on port 3000.
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  await app.listen(3000);
}
bootstrap();
