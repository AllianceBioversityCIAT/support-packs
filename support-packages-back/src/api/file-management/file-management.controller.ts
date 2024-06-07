import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileManagementService } from './file-management.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('')
export class FileManagementController {
  constructor(private readonly fileManagementService: FileManagementService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return await this.fileManagementService.uploadFile(file);
  }
}
