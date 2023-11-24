import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const cors ={
    origin: ['https://supportpacks-test.ciat.cgiar.org/'],
    methods: 'GET, HEAD,PUT,PATCH,POST,DELETE,OPTIONS'
  }

  app.enableCors(cors)


  await app.listen(3000);
}
bootstrap();
