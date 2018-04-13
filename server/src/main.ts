// import * as dotenv from 'dotenv';
import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as path from 'path';
import * as cors from 'cors';
import * as morgan from 'morgan';
import * as helmet from 'helmet';

// import * as expressJWT from 'express-jwt';

// import { HttpStatus } from '@nestjs/common';
import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ApplicationModule } from './app.module';
import { LogModule } from './log/log.module';
import { LogService } from './log/log.service';

import { NotFoundExceptionFilter } from './common/exceptions/not-found-exception.filter';
import { UnauthorizedExceptionFilter } from './common/exceptions/unauthorized-exception.filter';
import { AllExceptionFilter } from './common/exceptions/all-exception.filter';

import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/of';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/delay';
// dotenv.config();

const environment = require(`./environments/environment${process.env.NODE_ENV === 'production' ? '.prod' : ''}`).environment;

const expressApp: express.Application = express();
expressApp.use(express.static(path.join(__dirname, '../../', environment.dist)));

async function bootstrap() {
    const app = await NestFactory.create(ApplicationModule, expressApp, {});

    // const app: INestApplication = await NestFactory.create(ApplicationModule);
    const log = app.select(LogModule).get(LogService);
    app.useGlobalFilters(new NotFoundExceptionFilter(log),
        new UnauthorizedExceptionFilter(log),
        new AllExceptionFilter(log));

    // app.setGlobalPrefix(apiPath(1, ''));

    app.set('views', path.join(__dirname, '../../', environment.dist));
    app.set('view engine', 'hbs');
    // app.set('*.*', express.static(path.join(__dirname, 'public')));

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    // app.use(morgan('Url: :url Method: :method :status :res[content-length] - :response-time ms'));
    app.use(morgan('dev'));
    app.use(helmet());
    app.use(cors());

    const swaggerConfig = new DocumentBuilder()
        .addBearerAuth()
        .setTitle('Mean Nest Starter Sample api')
        .addTag('Auth')
        .addTag('Users')
        .addTag('Bags')
        .setDescription('Sample REST API that allows to manage list of users')
        .setVersion('1.0')
        .build();

    const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('/api/swagger', app, swaggerDocument);

    // app.use(expressJWT({ secret: process.env.JWT_SWECRET }).unless({ path: '/api/auth/authenticate' }), (error, req, res, next) => {
    //     if (error.name === 'UnauthorizedError') {
    //         res.status(HttpStatus.UNAUTHORIZED).json({
    //             message: error.message
    //         });
    //     }
    // });

    await app.listen(environment.port, () => {
        log.info(`Application is listining on port ${environment.port} in ${process.env.NODE_ENV} mode.`);
    });
}
bootstrap();

// export { environment };
