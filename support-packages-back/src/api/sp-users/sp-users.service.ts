import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.services';
import { Users } from './models/users.model';

@Injectable()
export class SpUsersService {
    constructor(private prisma: PrismaService){

    }

    async getAllUsers():Promise<Users[]>{
        return this.prisma.sp_users.findMany();
    }
}
