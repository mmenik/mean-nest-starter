import { Middleware, NestMiddleware, ExpressMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LogService } from '../../log/log.service';

@Middleware()
export class LogMiddleware implements NestMiddleware {

    constructor(private readonly log: LogService) { }

    resolve(param: string): ExpressMiddleware {
        return (req: Request, res: Response, next: NextFunction) => {
            this.log.debug(`${param} url:${req.url}, method:${req.method}`);
            next();
        };
    }
}
