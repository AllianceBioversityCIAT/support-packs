import { Controller, Get, Req, Res } from '@nestjs/common';
import { SpAppsService } from './sp-apps.service';
import {Request,Response} from 'express'

@Controller('sp-apps')
export class SpAppsController {
  constructor(private readonly spAppsService: SpAppsService) {}

  @Get('/all')
  async getAllApps(@Req() request: Request, @Res() response: Response) : Promise<any>{
    try{
      const result = await this.spAppsService.getAllApps();
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
