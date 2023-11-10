import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.services';

@Injectable()
export class SpCategoriesService {
    constructor(private prisma: PrismaService){

    }

    async getAllCategories():Promise<any>{
        return await this.prisma.sp_categories.findMany();
    }
}
