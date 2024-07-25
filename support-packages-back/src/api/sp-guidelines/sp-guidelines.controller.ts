import { Body, Controller, Get, Param, Post, Req, Res} from '@nestjs/common';
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

  // getGuidelineByIdWithouImportantLevels
  @Get('/allWithoutImportantLevels/:app_id')
  async getAllToolsPackWithoutImportantLevels(@Req() request: Request, @Res() response: Response,@Param('app_id') app_id) : Promise<any>{
    try{
      const result = await this.spGuidelinesService.getGuidelineByIdWithoutImportantLevels(app_id);
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
      const result = await this.spGuidelinesService.getActiveToolsByApp(app_id);
      
      
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

  @Get('/editPanelDesactive/:app_id')
  async getAllToolsEditPanelDesactive(@Req() request: Request, @Res() response: Response,@Param('app_id') app_id) : Promise<any>{
    try{
      const result = await this.spGuidelinesService.getDisabledToolsByApp(app_id);
      
      
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

  @Post('/updateTool/:app_id/:id')
  async updateTool(@Req() request: Request, @Res() response: Response, @Body() body:any, @Param('app_id') app_id, @Param('id') id) : Promise<any>{
    try{
      const result = await this.spGuidelinesService.putGuideline(app_id,id,body);
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

  @Post('/activeOrDesactive/:app_id/:id/:active')
  async activeOrDesativeTool(@Req() request: Request, @Res() response: Response, @Body() body:any, @Param('app_id') app_id, @Param('id') id, @Param('active') active) : Promise<any>{
    try{
      const result = await this.spGuidelinesService.enableOrDisableTool(app_id,id,body, active);
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

  @Post('/createToolNew/:app_id')
  async createToolNew(@Req() request: Request, @Res() response: Response, @Body() body:any, @Param('app_id') app_id,) : Promise<any>{
    try{
      const result = await this.spGuidelinesService.createToolNew(app_id,body);
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
