import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { env } from 'process';
import { Logger } from '@nestjs/common';

/**
 * Boots up the application by creating a NestFactory instance,
 * enabling CORS, and listening on port 3000.
 */
async function bootstrap() {
  const logger: Logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule, { cors: true });
  const port = env.PORT;

  await app
    .listen(port)
    .then(() => {
      logger.debug(`Application listening on port ${port}`);
    })
    .catch((err) => {
      const portValue: number | string = port || '<Not defined>';
      logger.error(`Application failed to start on port ${portValue}`);
      logger.error(err);
    });
}
bootstrap();
