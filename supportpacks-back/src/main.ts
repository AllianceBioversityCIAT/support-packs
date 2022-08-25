import { NestFactory } from '@nestjs/core';
import * as helmet from 'helmet';
import * as bodyParser from "body-parser";
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { Sequelize } from 'sequelize-typescript';

import express from 'express';
require('dotenv').config();


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {cors: true});
  const parentDir = require('path').resolve(process.cwd(), '../');

  const PORT: number = parseInt(process.env.PORT as string, 10);
  const HOST: string = process.env.LOCALHOST;
  // Call midlewares
  // app.enableCors();
  // app.use(helmet());// { frameguard: false }
  // app.use(helmet.contentSecurityPolicy({
  //   directives: {
  //     // ...
  //     frameSrc: ['https://wordpress.com']
  //   }
  // }));
  app.use(bodyParser.json());
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
    // res.header('Cross-Origin-Resource-Policy', 'same-site')
    next();
  });

//   app.use((err: any, req: any, res: { setHeader: (arg0: string, arg1: string) => void; }, next: any) => {
//     res.setHeader('Cross-Origin-Resource-Policy', 'same-site')
//     console.log(err)
// });


  app.useStaticAssets(join(process.cwd(), '../', '/supportpacks-front/dist/aiccrasp/'));
  app.useStaticAssets(join(process.cwd(), '../', '/supportpacks-front/dist/melsp/'));
  app.useStaticAssets(join(process.cwd(), '../', '/supportpacks-front/dist/dmsp/'));

  await app.listen(PORT, `${HOST}`, () => {
    console.log(`Current parent directory: ${parentDir} `);
    console.log(`Server started on port ${PORT} and host ${HOST}!`);
  });
}
bootstrap();
