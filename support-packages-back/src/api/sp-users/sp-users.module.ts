import { Module } from '@nestjs/common';
import { SpUsersService } from './sp-users.service';
import { SpUsersController } from './sp-users.controller';
import { PrismaService } from 'src/prisma.services';

@Module({
  controllers: [SpUsersController],
  providers: [SpUsersService, PrismaService],
})
export class SpUsersModule {}
