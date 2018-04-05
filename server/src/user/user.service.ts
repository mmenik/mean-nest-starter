import { Component } from '@nestjs/common';
import { AccountDto } from '../../../shared/src/dto/account.dto';
import { LogService } from '../log/log.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { PasswordCryptService } from '../auth/password/password-crypt.service';

@Component()
// tslint:disable-next-line:component-class-suffix
export class UserService {

    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>,
        private readonly passwordCryptService: PasswordCryptService,
        private readonly log: LogService) { }

    async findAll(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async findByUsername(username: string): Promise<User> {
        this.log.info(`Find user by username: ${username}`);
        return await this.userRepository.findOne({ username: username });
    }

    async create(account: AccountDto): Promise<User> {
        this.log.info(`Create user ${JSON.stringify(account)}`);

        const result: User = await this.userRepository.save(User.fromDto(account,
            await this.passwordCryptService.doHash(account.login.password)));

        this.log.debug(`Persisted user:${JSON.stringify(result)}`);

        return result;
    }
}
