import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { SupportPacksModule } from './support-packs/support-packs.module';
import { ServeStaticModule } from '@nestjs/serve-static/';
import { join } from 'path';
import { FrontendMiddleware } from './frontend.middleware';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';

require('dotenv').config();

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.HOST_DB,
      port: parseInt(process.env.DB_PORT as string, 10),
      username: process.env.USER_DB,
      password: process.env.PASS_DB,
      database: process.env.DB,
      models: [],
      autoLoadModels: true,
      synchronize: false,
    }),

    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.HOST_DB,
      port: parseInt(process.env.DB_PORT as string, 10),
      username: process.env.USER_DB,
      password: process.env.PASS_DB,
      database: process.env.DB,
      entities: [],
      autoLoadEntities: true,
      synchronize: true,
    }),

    SupportPacksModule,
    ServeStaticModule.forRoot(
      {
        rootPath: join(process.cwd(), '../', '/supportpacks-front/dist/melsp/'),
        serveRoot: '/melsp',
        exclude: ['/api*'],
      },
      {
        rootPath: join(process.cwd(), '../', '/supportpacks-front/dist/dmsp/'),
        serveRoot: '/dmsp',
        exclude: ['/api*'],
      },
      {
        rootPath: join(
          process.cwd(),
          '../',
          '/supportpacks-front/dist/aiccrasp',
        ),
        // renderPath:'index.html',
        serveRoot: '/aiccrasp',
        exclude: ['/api*'],
      },
      {
        rootPath: join(process.cwd(), '../', '/data/'),
        serveRoot: '/data',
        renderPath: '',
      },
    ),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  // configure(consumer: MiddlewareConsumer): void {
  //   consumer.apply(FrontendMiddleware).forRoutes(
  //     {
  //       path: 'aiccrasp/**', // For all routes
  //       method: RequestMethod.ALL, // For all methods
  //     },
  //   );
  // }
}
