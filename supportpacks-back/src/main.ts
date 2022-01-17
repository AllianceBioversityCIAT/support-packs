import { NestFactory } from '@nestjs/core';
import * as helmet from 'helmet';
import * as bodyParser from "body-parser";
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
require('dotenv').config();


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const parentDir = require('path').resolve(process.cwd(), '../');

  const PORT: number = parseInt(process.env.PORT as string, 10);
  const HOST: string = process.env.LOCALHOST;

  // Call midlewares
  app.enableCors();
  app.use(helmet({ frameguard: false }));
  app.use(bodyParser.json());

  app.use((err: any, req: any, res: { setHeader: (arg0: string, arg1: string) => void; }, next: any) => {
    res.setHeader('Cross-Origin-Resource-Policy', 'same-site')
    console.log(err)
});

  // app.useStaticAssets(join(process.cwd(), '../', '/supportpacks-front/dist'));

  await app.listen(PORT, `${HOST}`, () => {
    console.log(`Current parent directory: ${parentDir} `);
    console.log(`Server started on port ${PORT} and host ${HOST}!`);
  });
}
bootstrap();
