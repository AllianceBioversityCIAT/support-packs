import { Controller, Get, Req, Res } from '@nestjs/common';
import { SpRolesService } from './sp-roles.service';
import {Request,Response} from 'express'

@Controller('sp-roles')
export class SpRolesController {
  constructor(private readonly spRolesService: SpRolesService) {}

  @Get('/all')
  async getAllUsers(@Req() request: Request, @Res() response: Response) : Promise<any>{
    try{
      const result = await this.spRolesService.getAllRoles();
      return response.status(200).json({
           status: 'Ok!',
           message: 'Successfully fetch data!',
           result: result
      })
 }catch(err){
      return response.status(500).json({
            error: err,
           status: 'Ok!',
           message : 'Internal Server Error!'
      })
 }
  }


  @Get('/by-id')
  async getRoleById(@Req() request: Request, @Res() response: Response) : Promise<any>{
    try{
      const result = await this.spRolesService.getRoleById(1);
      return response.status(200).json({
           status: 'Ok!',
           message: 'Successfully fetch data!',
           result: result
      })}catch(err){
        return response.status(500).json({
          error: err,
         status: 'Ok!',
         message : 'Internal Server Error!'
    })
      }
    
    }


}
