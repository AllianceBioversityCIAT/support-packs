import { Controller, Get, Req, Res } from '@nestjs/common';
import { SpUsersService } from './sp-users.service';
import { Request, Response } from 'express';

@Controller('sp-users')
export class SpUsersController {
  constructor(private readonly spUsersService: SpUsersService) {}
  @Get('/all')
  async getAllUsers(
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<any> {
    try {
      const result = await this.spUsersService.getAllUsers();
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

  // Get user based on email
  @Get('/get-user')
  async getUserByEmail(
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<any> {
    try {
      console.log(request.query.email);
      const email = request.query.email as string;
      const user = await this.spUsersService.getUserByEmail(email);
      return response.status(200).json({
        status: 'Ok!',
        message: 'Successfully fetch data!',
        user,
      });
    } catch (err) {
      return response.status(500).json({
        error: err,
        status: 'Ok!',
        message: 'Internal Server Error!',
      });
    }
  }
}
