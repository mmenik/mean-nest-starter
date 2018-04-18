import { LogModule } from '../log/log.module';
import { Module, NestModule, MiddlewaresConsumer, RequestMethod } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtStrategy } from './passport/jwt.strategy';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { PasswordCryptService } from './password/password-crypt.service';
import { AuthMiddleware } from '../common/middlewares/auth.middleware';
import { UserController } from '../user/user.controller';

@Module({
    imports: [UserModule, LogModule],
    components: [AuthService, JwtStrategy, PasswordCryptService],
    controllers: [AuthController]
})
export class AuthModule implements NestModule {
    public configure(consumer: MiddlewaresConsumer) {
        consumer.apply(AuthMiddleware)
            .forRoutes({ path: '/api/v1/auth/token', method: RequestMethod.GET }, UserController);
    }
}
