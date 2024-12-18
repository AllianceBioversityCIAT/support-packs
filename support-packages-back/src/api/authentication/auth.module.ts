import { Module } from '@nestjs/common';

import { AuthService } from './auth.service';

import { JwtStrategy } from './jwt.strategy';

import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.services';
import { SpUsersService } from '../sp-users/sp-users.service';
import { SpUsersModule } from '../sp-users/sp-users.module';
import { AuthController } from './auth.controller';
import { env } from 'process';

@Module({
  controllers: [AuthController],
  providers: [AuthService, PrismaService, JwtStrategy, SpUsersService],
  imports: [
    SpUsersModule,
    PassportModule,
    JwtModule.register({
      secret: env.JWT_SECRET,
      signOptions: {
        expiresIn: env.JWT_EXPIRES_IN,
      },
    }),
  ],
})
export class AuthModule {}
