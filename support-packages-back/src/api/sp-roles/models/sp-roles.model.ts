import { Prisma } from "@prisma/client";

export class SpRoles implements Prisma.sp_rolesCreateInput{
    name: string;
    description: string;
    acronym: string;
    apps: Prisma.sp_appsCreateNestedOneWithoutRolesInput;
}