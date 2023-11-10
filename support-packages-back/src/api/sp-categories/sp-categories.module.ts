import { Module } from '@nestjs/common';
import { SpCategoriesService } from './sp-categories.service';
import { SpCategoriesController } from './sp-categories.controller';
import { PrismaService } from 'src/prisma.services';

@Module({
  controllers: [SpCategoriesController],
  providers: [SpCategoriesService, PrismaService],
})
export class SpCategoriesModule {}
