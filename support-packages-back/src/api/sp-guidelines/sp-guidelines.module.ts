import { Module } from '@nestjs/common';
import { SpGuidelinesService } from './sp-guidelines.service';
import { SpGuidelinesController } from './sp-guidelines.controller';
import { PrismaService } from 'src/prisma.services';

@Module({
  controllers: [SpGuidelinesController],
  providers: [SpGuidelinesService, PrismaService],
})
export class SpGuidelinesModule {}
