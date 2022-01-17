import { NestMiddleware, Injectable } from '@nestjs/common';
import {Request, Response} from "express"
import path, { join, resolve } from 'path';

const allowedExt = [
    '.js',
    '.ico',
    '.css',
    '.png',
    '.jpg',
    '.woff2',
    '.woff',
    '.ttf',
    '.svg',
  ];
  
  const resolvePath = (file: string) => path.resolve(join(process.cwd(), '../', '/supportpacks-front/dist/aiccrasp/index.html'));

@Injectable()
export class FrontendMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function) {
    res.sendFile(resolve(join(process.cwd(), '../', '/supportpacks-front/dist/aiccrasp/index.html')));
  }
}