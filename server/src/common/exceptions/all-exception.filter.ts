import { ExceptionFilter, Catch, HttpStatus, } from '@nestjs/common';
import { LogService } from '../../log/log.service';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
    constructor(private readonly log: LogService) { }

    async catch(exception: any, res) {
        if (!exception.status || exception.status === HttpStatus.INTERNAL_SERVER_ERROR) {
            this.log.error(`${JSON.stringify(exception.message)}`);
        } else {
            this.log.warn(`${JSON.stringify(exception.message)}`);
        }
        res.status(exception.status || HttpStatus.INTERNAL_SERVER_ERROR).json(exception.message);
    }
}
