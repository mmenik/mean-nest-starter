import { Middleware, NestMiddleware, ExpressMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import * as passport from 'passport';

@Middleware()
export class AuthMiddleware implements NestMiddleware {
    resolve(param: string): ExpressMiddleware {
        return async (req: Request, res: Response, next: NextFunction) => {
            return await passport.authenticate('jwt', { session: false }, (err, user, info) => {
                if (err === 'invalid') {
                    next(new UnauthorizedException('Invalid user'));
                } else if (!user) {
                    next(new UnauthorizedException('Token expires or not valid'));
                } else {
                    next();
                }
            })(req, res, next);
        };
    }
}
