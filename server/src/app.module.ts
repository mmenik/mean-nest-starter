import { Module, NestModule, MiddlewaresConsumer, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { LogModule } from './log/log.module';
import { LogMiddleware } from './common/middlewares/log.middleware';

import { AuthController } from './auth/auth.controller';
import { UserController } from './user/user.controller';

// import { environment } from './main';
const environment = require(`./environments/environment${process.env.NODE_ENV === 'production' ? '.prod' : ''}`).environment;

@Module({
  imports: [
    TypeOrmModule.forRoot(environment.orm),
    LogModule,
    AuthModule,
    UserModule
  ]
})
export class ApplicationModule implements NestModule {
  configure(consumer: MiddlewaresConsumer): void {
    consumer.apply(LogMiddleware)
      .with('Request api')
      .forRoutes(AuthController, UserController);
  }
}
