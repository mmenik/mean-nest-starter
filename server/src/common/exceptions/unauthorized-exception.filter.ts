import { ExceptionFilter, Catch, UnauthorizedException, HttpCode, HttpStatus } from '@nestjs/common';
import { LogService } from '../../log/log.service';

@Catch(UnauthorizedException)
export class UnauthorizedExceptionFilter implements ExceptionFilter {
    constructor(private readonly log: LogService) { }

    async catch(exception: UnauthorizedException, res) {
        this.log.warn(`Unauthorized exception: ${JSON.stringify(exception.message)}`);
        res.status(HttpStatus.UNAUTHORIZED).json(exception.message);
    }
}
