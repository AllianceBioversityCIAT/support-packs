import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { SupportPacksModule } from './support-packs/support-packs.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

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
      synchronize: true,
    }),
    SupportPacksModule,
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), '../', '/supportpacks-front/dist/melsp/'),
      serveRoot: '/melsp',
      exclude: ['/api*'],
    }, {
      rootPath: join(process.cwd(), '../', '/supportpacks-front/dist/dmsp/'),
      serveRoot: '/dmsp',
      exclude: ['/api*'],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
