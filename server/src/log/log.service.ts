
import { Component } from '@nestjs/common';
import { configure, getLogger, Configuration } from 'log4js';

@Component()
// tslint:disable-next-line:component-class-suffix
export class LogService {
    readonly trace;
    readonly debug;
    readonly info;
    readonly warn;
    readonly error;
    readonly fatal;

    constructor() {
        const cfg: Configuration = {
            appenders: {
                out: {
                    type: 'console',
                    layout: {
                        type: 'pattern',
                        pattern: '%[[Server] %z -%] %d{yyyy-MM-dd hh.mm.ss}  %[[%p] %m%]'
                    }
                },
                file: {
                    type: 'file',
                    layout: {
                        type: 'pattern',
                        pattern: '[Server] %z - %d{yyyy-MM-dd hh.mm.ss} [%p] %m'
                    },
                    filename: 'logs/app.log',
                    pattern: '-yyyy-MM-dd',
                    maxLogSize: 10000,
                    numBackups: 3
                }
            },
            categories: {
                default: {
                    appenders: ['out', 'file'],
                    level: 'debug'
                }
            }
        };
        configure(cfg);
        const logger = getLogger();
        logger.info(`Create log with level: ${logger.level}`);

        this.trace = logger.trace.bind(logger);
        this.debug = logger.debug.bind(logger);
        this.info = logger.info.bind(logger);
        this.warn = logger.warn.bind(logger);
        this.error = logger.error.bind(logger);
        this.fatal = logger.fatal.bind(logger);
    }
}
