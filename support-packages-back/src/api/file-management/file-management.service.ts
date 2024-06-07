import { Injectable } from '@nestjs/common';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { env } from 'process';

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

  async uploadFile(file: Express.Multer.File) {
    const bucketName = env.AWS_BUCKET_NAME;

    const key = `${Date.now()}-${file.originalname}`;

    const uploadParams = {
      Bucket: bucketName,
      Key: key,
      Body: file.buffer,
    };

    try {
      const command = new PutObjectCommand(uploadParams);

      await this.s3Client.send(command);

      const fileUrl = `https://${bucketName}.s3.amazonaws.com/${key}`;

      return { fileName: file.originalname, fileUrl };
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
