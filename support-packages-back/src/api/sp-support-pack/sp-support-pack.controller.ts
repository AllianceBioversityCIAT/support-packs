import { Body, Controller, Get, Param, Post, Req, Res } from '@nestjs/common';
import { SpSupportPackService } from './sp-support-pack.service';
import { Request, Response } from 'express';

@Controller()
export class SpSupportPackController {
  constructor(private readonly spSupportPackService: SpSupportPackService) {}

  @Get('/all/:app_id')
  async getAllSupportPack(
    @Req() request: Request,
    @Res() response: Response,
    @Param('app_id') app_id,
  ): Promise<any> {
    try {
      const result = await this.spSupportPackService.getAllFiltersByApp(app_id);

      console.log(result);
      return response.status(200).json({
        status: 'Ok!',
        message: 'Successfully fetch data!',
        result: result,
      });
    } catch (err) {
      return response.status(500).json({
        error: err,
        status: 'Ok!',
        message: 'Internal Server Error!',
      });
    }
  }

  @Post('/create')
  async createDowloandTool(
    @Req() request: Request,
    @Res() response: Response,
    @Body() body: any,
  ): Promise<any> {
    try {
      const result = await this.spSupportPackService.createDowloandTool(body);
      return response.status(200).json({
        status: 'Ok!',
        message: 'Successfully fetch data!',
        result: result,
      });
    } catch (err) {
      return response.status(500).json({
        error: err,
        status: 'Ok!',
        message: 'Internal Server Error!',
      });
    }
  }

  @Post('/createRequest')
  async createRequestTool(
    @Res() response: Response,
    @Body() body: any,
  ): Promise<any> {
    try {
      const result = await this.spSupportPackService.createRequestTool(body);

      return response.status(200).json({
        status: 'Ok!',
        message: 'Successfully fetch data!',
        result: result,
      });
    } catch (err) {
      return response.status(500).json({
        error: err,
        status: 'Ok!',
        message: 'Internal Server Error!',
      });
    }
  }

  @Get('/resquest')
  async getAllrequest(
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<any> {
    try {
      const result = await this.spSupportPackService.getRequestPending();
      console.log(result);

      return response.status(200).json({
        status: 'Ok!',
        message: 'Successfully fetch data!',
        result: result,
      });
    } catch (err) {
      console.log(err);

      return response.status(500).json({
        error: err,
        status: 'Ok!',
        message: 'Internal Server Error!',
      });
    }
  }

  @Post('/registerDowloadTool')
  async registerDowloadTool(
    @Req() request: Request,
    @Res() response: Response,
    @Body() body: any,
  ): Promise<any> {
    try {
      const result = await this.spSupportPackService.registerDowloadTool(body);
      return response.status(200).json({
        status: 'Ok!',
        message: 'Successfully fetch data!',
        result: result,
      });
    } catch (err) {
      return response.status(500).json({
        error: err,
        status: 'Ok!',
        message: 'Internal Server Error!',
      });
    }
  }

  @Post('/createToolNewRequest/:app_id')
  async createToolNewRequest(
    @Req() request: Request,
    @Res() response: Response,
    @Body() body: any,
    @Param('app_id') app_id,
  ): Promise<any> {
    try {
      const result = await this.spSupportPackService.createRequestToolNew(
        app_id,
        body,
      );
      return response.status(200).json({
        status: 'Ok!',
        message: 'Successfully fetch data!',
        result: result,
      });
    } catch (err) {
      return response.status(500).json({
        error: err,
        status: 'Ok!',
        message: 'Internal Server Error!',
      });
    }
  }

  @Get('/editRequest/:app_id')
  async getAllToolsEditPanel(
    @Req() request: Request,
    @Res() response: Response,
    @Param('app_id') app_id,
  ): Promise<any> {
    try {
      const result = await this.spSupportPackService.getAllRequestTools(app_id);

      return response.status(200).json({
        status: 'Ok!',
        message: 'Successfully fetch data!',
        result: result,
      });
    } catch (err) {
      console.log(err);

      return response.status(500).json({
        error: err,
        status: 'Ok!',
        message: 'Internal Server Error!',
      });
    }
  }

  @Post('/updateToolRequest/:app_id/:id')
  async updateTool(
    @Req() request: Request,
    @Res() response: Response,
    @Body() body: any,
    @Param('app_id') app_id,
    @Param('id') id,
  ): Promise<any> {
    try {
      const result = await this.spSupportPackService.putGuidelineRequest(
        app_id,
        id,
        body,
      );
      return response.status(200).json({
        status: 'Ok!',
        message: 'Successfully fetch data!',
        result: result,
      });
    } catch (err) {
      console.log(err);

      return response.status(500).json({
        error: err,
        status: 'Ok!',
        message: 'Internal Server Error!',
      });
    }
  }

  @Post('/denyToolRequest/:app_id/:id')
  async denyTool(
    @Req() request: Request,
    @Res() response: Response,
    @Param('app_id') app_id,
    @Param('id') id,
  ): Promise<any> {
    try {
      const result = await this.spSupportPackService.deleteGuidelineRequest(
        app_id,
        id,
      );
      return response.status(200).json({
        status: 'Ok!',
        message: 'Successfully fetch data!',
        result: result,
      });
    } catch (err) {
      console.log(err);

      return response.status(500).json({
        error: err,
        status: 'Ok!',
        message: 'Internal Server Error!',
      });
    }
  }
}
