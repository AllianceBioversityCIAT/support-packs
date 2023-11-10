import { Controller, Get, Req, Res } from '@nestjs/common';
import { SpUsersService } from './sp-users.service';
import {Request,Response} from 'express'


@Controller('sp-users')
export class SpUsersController {
  constructor(private readonly spUsersService: SpUsersService) {}
  @Get('/all')
  async getAllUsers(@Req() request: Request, @Res() response: Response) : Promise<any>{
    try{
      const result = await this.spUsersService.getAllUsers();
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
}
