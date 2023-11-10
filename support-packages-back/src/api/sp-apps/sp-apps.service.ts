import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.services';

@Injectable()
export class SpAppsService {
    constructor(private prisma: PrismaService){}

    async getAllApps():Promise<any>{
        return await this.prisma.sp_apps.findMany(
            {
                include: {
                    roles: true,
                    stages: true,
                    categories: true
                }
            }
        );
    }
}
