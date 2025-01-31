import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request } from "express";

@Injectable()
export class LoggerMiddleware implements NestMiddleware{
    use(request : Request, response : Response, next : NextFunction){
        console.log(`[Info] Method ${request.method} ${request.url}`)
        next()
    }
}