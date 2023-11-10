import { Prisma } from "@prisma/client";

export class Users implements Prisma.sp_usersCreateInput{
first_name: string ;
  last_name: string;
  email: string ;
  password: string ;
  is_cgiar: boolean;
}