import { NestMiddleware, Injectable } from '@nestjs/common';
import { Request, Response } from "express"
import  { join, resolve } from 'path';
import * as path from 'path';
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

const ROUTE_PREFIX = "api";

const resolvePath = (file: string) => path.resolve(join(process.cwd(), '../', '/supportpacks-front/dist/aiccrasp/', file));
@Injectable()
export class FrontendMiddleware implements NestMiddleware {
    use(req: any, res: any, next: () => void) {
        const { url } = req;
        if (url.indexOf(ROUTE_PREFIX) === 1) {
            // it starts with /api --> continue with execution
            next();
        } else if (allowedExt.filter(ext => url.indexOf(ext) > 0).length > 0) {
            // it has a file extension --> resolve the file
            res.sendFile(resolvePath(url));
        } else {
            // in all other cases, redirect to the index.html!
            res.sendFile(resolvePath('index.html'));
        }
        // throw new Error('Method not implemented.');
    }

}