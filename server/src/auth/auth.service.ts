import * as jwt from 'jsonwebtoken';
import { Component } from '@nestjs/common';
import { LogService } from '../log/log.service';
import { LoginDto } from '../../../shared/src/dto/login.dto';
import { UserService } from '../user/user.service';
import { PasswordCryptService } from './password/password-crypt.service';
import { User } from '../user/user.entity';
import { v4 } from 'uuid';

@Component()
// tslint:disable-next-line:component-class-suffix
export class AuthService {
    private readonly _secret: string = v4();

    constructor(private readonly userService: UserService,
        private passwordCryptService: PasswordCryptService,
        private readonly log: LogService) { }

    get secret(): string {
        return this._secret;
    }

    async createToken(username: string) {
        this.log.info(`Create token for user: ${username}`);
        const secretOrPrivateKey: jwt.Secret = this.secret;
        const options: jwt.SignOptions = {
            expiresIn: '1m',
            algorithm: 'HS256'
        };
        const token = jwt.sign({ username }, secretOrPrivateKey, options);
        return {
            expiresIn: options.expiresIn,
            token: token,
        };
    }

    async authenticateUser(username: string, password: string): Promise<boolean> {
        this.log.info(`Authenticate user: ${JSON.stringify(username)}`);
        if (username && password) {
            const user: User = await this.userService.findByUsername(username);
            this.log.debug(`User:${JSON.stringify(user)}`);
            if (user) {
                this.log.debug(`password:${password}, hash:${user.password}`);
                return await this.passwordCryptService.doCompare(password, user.password);
            }
        }
        return false;
    }

    async validateUser(username: string): Promise<boolean> {
        this.log.info(`Validate user: ${JSON.stringify(username)}`);
        if (username) {
            const user: User = await this.userService.findByUsername(username);
            return Boolean(user);
        }
        return false;
    }
}
