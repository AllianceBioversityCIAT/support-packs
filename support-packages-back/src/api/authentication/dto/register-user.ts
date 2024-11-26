import { IsString, Length } from "class-validator";


export class RegisterUsersDto {
    first_name: string;
    last_name: string;
     @IsString()
     @Length(6,12)
     password: string
     
     email:string
     is_cgiar: boolean;
}