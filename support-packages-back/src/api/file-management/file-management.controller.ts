import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Body,
  Res,
  Delete,
  Param,
} from '@nestjs/common';
import { FileManagementService } from './file-management.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import * as archiver from 'archiver';
import * as path from 'path';

@Controller('')
export class FileManagementController {
  constructor(private readonly fileManagementService: FileManagementService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return await this.fileManagementService.uploadFile(file);
  }

  @Delete('delete/:key')
  async deleteFile(@Param('key') key) {
    return await this.fileManagementService.removeFile(key);
  }

  @Post('download-zip')
  async downloadAndZip(
    @Body() fileDetails: { keys: string[] },
    @Res() res: Response,
  ) {
    const { keys } = fileDetails;

    if (!keys || keys.length === 0) {
      return res.status(400).json({ message: 'No files to download' });
    }

    if (keys.length === 1) {
      const key = keys[0];
      try {
        const fileStream = await this.fileManagementService.getFileStream(key);
        const fileName = path.basename(key);

        res.setHeader('Content-Type', 'application/octet-stream');
        res.setHeader(
          'Content-Disposition',
          `attachment; filename=${fileName}`,
        );

        fileStream.pipe(res);
      } catch (error) {
        console.error(`Error fetching ${key} from S3:`, error);
        res.status(404).json({ message: `File ${key} not found` });
      }
    } else {
      res.setHeader('Content-Type', 'application/zip');
      res.setHeader('Content-Disposition', `attachment; filename=Tools.zip`);

      const archive = archiver('zip', {
        zlib: { level: 9 },
      });

      archive.on('error', (err) => {
        throw err;
      });

      archive.pipe(res);

      for (const key of keys) {
        try {
          const fileStream =
            await this.fileManagementService.getFileStream(key);
          const fileName = path.basename(key);
          archive.append(fileStream, { name: fileName });
        } catch (error) {
          console.error(`Error fetching ${key} from S3:`, error);
        }
      }

      await archive.finalize();
    }
  }
}
