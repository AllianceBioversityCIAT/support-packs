import { Injectable } from '@nestjs/common';
import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { env } from 'process';
import { PassThrough } from 'stream';
import { pipeline } from 'stream/promises';

@Injectable()
export class FileManagementService {
  private readonly s3Client: S3Client;

  constructor() {
    this.s3Client = new S3Client({
      region: env.AWS_REGION,
      credentials: {
        accessKeyId: env.AWS_ACCESS_KEY_ID,
        secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
      },
    });
  }

  async getFileStream(key: string): Promise<NodeJS.ReadableStream> {
    const command = new GetObjectCommand({
      Bucket: env.AWS_BUCKET_NAME,
      Key: key,
    });

    const { Body } = await this.s3Client.send(command);
    if (Body instanceof ReadableStream) {
      const passThrough = new PassThrough();
      await pipeline(Body as any, passThrough);
      return passThrough;
    }

    return Body as NodeJS.ReadableStream;
  }

  async uploadFile(file: Express.Multer.File) {
    const bucketName = env.AWS_BUCKET_NAME;

    const fileName = file.originalname.replace(/ /g, '_');

    const key = `${Date.now()}-${fileName}`;

    const uploadParams = {
      Bucket: bucketName,
      Key: key,
      Body: file.buffer,
    };

    try {
      const command = new PutObjectCommand(uploadParams);

      await this.s3Client.send(command);

      const fileUrl = `https://${bucketName}.s3.amazonaws.com/${key}`;

      return { fileName: file.originalname, fileUrl, key };
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async removeFile(key: string) {
    try {
      const bucketName = env.AWS_BUCKET_NAME;

      const deleteParams = {
        Bucket: bucketName,
        Key: key,
      };

      console.log(key);

      await this.s3Client.send(new DeleteObjectCommand(deleteParams));

      return { message: `File ${key} deleted successfully` };
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
