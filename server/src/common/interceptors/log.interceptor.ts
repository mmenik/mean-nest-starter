import { NestInterceptor, ExecutionContext, Interceptor } from '@nestjs/common';
import { Observable } from 'rxjs/Observable';
import { LogService } from '../../log/log.service';

@Interceptor()
export class LogInterceptor implements NestInterceptor {

    constructor(private readonly log: LogService) { }

    intercept(dataOrRequest, context: ExecutionContext, stream$: Observable<any>): Observable<any> {
        this.log.debug(`Start process api url:${dataOrRequest.originalUrl}, method:${dataOrRequest.method}`);
        const now = Date.now();
        return stream$.do(
            () => this.log.debug(
                `End process api url:${dataOrRequest.originalUrl}, method:${dataOrRequest.method} in ${Date.now() - now}ms`)
        );
    }
}

