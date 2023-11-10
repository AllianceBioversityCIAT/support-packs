import { Controller, Get, Req, Res } from '@nestjs/common';
import { SpCategoriesService } from './sp-categories.service';
import {Request,Response} from 'express'

@Controller('sp-categories')
export class SpCategoriesController {
  constructor(private readonly spCategoriesService: SpCategoriesService) {}

  @Get('/all')
  async getAllApps(@Req() request: Request, @Res() response: Response) : Promise<any>{
    try{
      const result = await this.spCategoriesService.getAllCategories();
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
