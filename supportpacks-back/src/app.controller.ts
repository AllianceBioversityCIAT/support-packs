import { Controller, Get, Res } from '@nestjs/common';
import { join } from 'path';
import { AppService } from './app.service';
const parentDir = require('path').resolve(process.cwd(), '../');

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // @Get('aiccrasp/**')
  // sendApplication(@Res() res) {
  //   res.sendFile(parentDir + '/supportpacks-front/dist/aiccrasp/index.html');
  // }
}
