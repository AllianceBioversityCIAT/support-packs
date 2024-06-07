import { Module } from '@nestjs/common';
import { SpGuidelinesService } from './sp-guidelines.service';
import { SpGuidelinesController } from './sp-guidelines.controller';
import { PrismaService } from 'src/prisma.services';
import { FileManagementService } from '../file-management/file-management.service';

@Module({
  controllers: [SpGuidelinesController],
  providers: [SpGuidelinesService, PrismaService],
  imports: [FileManagementService],
})
export class SpGuidelinesModule {}
