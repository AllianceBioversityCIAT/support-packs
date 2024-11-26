import { Module } from '@nestjs/common';
import { SpRolesService } from './sp-roles.service';
import { SpRolesController } from './sp-roles.controller';
import { PrismaService } from 'src/prisma.services';

@Module({
  controllers: [SpRolesController],
  providers: [SpRolesService, PrismaService],
})
export class SpRolesModule {}
