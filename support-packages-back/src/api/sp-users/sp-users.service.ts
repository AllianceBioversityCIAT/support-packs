import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.services';
import { Users } from './models/users.model';

@Injectable()
export class SpUsersService {
  constructor(private prisma: PrismaService) {}

  async getAllUsers(): Promise<Users[]> {
    return this.prisma.sp_users.findMany();
  }

  async createUser(data: any): Promise<any> {
    const existing = await this.prisma.sp_users.findUnique({
      where: {
        email: data.email,
      },
    });

    if (existing) {
      throw new ConflictException('username already exists');
    }
    const user = await this.prisma.sp_users.create({
      data,
    });
    return user;
  }

  async getUserByEmail(email: string) {
    const user = await this.prisma.sp_person.findUnique({
      where: {
        email: email,
      },
    });

    if (user) {
      const getInstitution = await this.prisma.sp_download.findMany({
        where: {
          user_id: user.id,
        },
        orderBy: {
          id: 'desc',
        },
        select: {
          institute: true,
        },
      });

      return {
        ...user,
        ...getInstitution[0],
      };
    }

    return user;
  }
}
