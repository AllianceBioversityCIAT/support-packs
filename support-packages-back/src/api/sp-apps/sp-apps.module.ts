import { Module } from '@nestjs/common';
import { SpAppsService } from './sp-apps.service';
import { SpAppsController } from './sp-apps.controller';
import { PrismaService } from 'src/prisma.services';

@Module({
  controllers: [SpAppsController],
  providers: [SpAppsService, PrismaService],
})
export class SpAppsModule {}
