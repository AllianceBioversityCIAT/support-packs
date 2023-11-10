import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.services';
import { Prisma } from '@prisma/client';

@Injectable()
export class SpRolesService {
    constructor(private prisma: PrismaService){
    }

    async getAllRoles():Promise<any>{
        return await this.prisma.sp_roles.findMany(
            {
                include: {
                    apps: true
                }
            }
        );
    }

    async getRoleById(id: number):Promise<any>{
        return await this.prisma.$queryRaw(Prisma.sql`
            SELECT * FROM sp_roles WHERE id = ${id}
        `)
    }
}
