import { Controller, Get, Param, Req, Res} from '@nestjs/common';
import { SpGuidelinesService } from './sp-guidelines.service';
import {Request,Response} from 'express'
@Controller('sp-guidelines')
export class SpGuidelinesController {
  constructor(private readonly spGuidelinesService: SpGuidelinesService) {}

  @Get('/all/:app_id')
  async getAllToolsPack(@Req() request: Request, @Res() response: Response,@Param('app_id') app_id) : Promise<any>{
    try{
      const result = await this.spGuidelinesService.getAllGuidelines(app_id);
      return response.status(200).json({
        status: 'Ok!',
        message: 'Successfully fetch data!',
        result: result
   })
    }catch(err){
      console.log(err);
      
      return response.status(500).json({
        error: err,
       status: 'Ok!',
       message : 'Internal Server Error!'
  })
    }
  }

  @Get('/overview/:app_id')
  async getAllToolsOverView(@Req() request: Request, @Res() response: Response,@Param('app_id') app_id) : Promise<any>{
    try{
      const result = await this.spGuidelinesService.getGuidelineById(app_id);
      return response.status(200).json({
        status: 'Ok!',
        message: 'Successfully fetch data!',
        result: result
   })
    }catch(err){
      console.log(err);
      
      return response.status(500).json({
        error: err,
       status: 'Ok!',
       message : 'Internal Server Error!'
  })
    }
  }

  @Get('/editPanel/:app_id')
  async getAllToolsEditPanel(@Req() request: Request, @Res() response: Response,@Param('app_id') app_id) : Promise<any>{
    try{
      const result = await this.spGuidelinesService.getGuidelineByApp(app_id);
      
      
      return response.status(200).json({
        status: 'Ok!',
        message: 'Successfully fetch data!',
        result: result
   })
    }catch(err){
      console.log(err);
      
      return response.status(500).json({
        error: err,
       status: 'Ok!',
       message : 'Internal Server Error!'
  })
    }
  }
}
