import { Module } from '@nestjs/common';
import { SpSupportPackService } from './sp-support-pack.service';
import { SpSupportPackController } from './sp-support-pack.controller';
import { PrismaService } from 'src/prisma.services';

@Module({
  controllers: [SpSupportPackController],
  providers: [SpSupportPackService, PrismaService],
  imports: [],
})
export class SpSupportPackModule {}
