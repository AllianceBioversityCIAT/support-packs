
import { Prisma } from "@prisma/client";

export class SpApps implements Prisma.sp_appsCreateInput{
    name: string;
    roles: Prisma.sp_rolesCreateNestedManyWithoutAppsInput;
}