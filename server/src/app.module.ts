import { Module, NestModule, MiddlewaresConsumer, RequestMethod } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BagModule } from './bag/bag.module';
import { LogModule } from './log/log.module';

import { LogMiddleware } from './common/middlewares/log.middleware';

import { AuthController } from './auth/auth.controller';
import { UserController } from './user/user.controller';
import { ConfigModule } from './config/config.module';

// import { environment } from './main';
const environment = require(`./environments/environment${process.env.NODE_ENV === 'production' ? '.prod' : ''}`).environment;

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/mean-nest-starter'),
    TypeOrmModule.forRoot(environment.orm),
    BagModule,
    LogModule,
    AuthModule,
    UserModule,
    ConfigModule
  ]
})
export class ApplicationModule implements NestModule {
  configure(consumer: MiddlewaresConsumer): void {
    consumer.apply(LogMiddleware)
      .with('Request api')
      .forRoutes(AuthController, UserController);
  }
}
