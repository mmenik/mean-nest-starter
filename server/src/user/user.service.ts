import { Component } from '@nestjs/common';
import { LogService } from '../log/log.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { PasswordCryptService } from '../auth/password/password-crypt.service';
import { UserDto } from '../../../shared/src/dto/user.dto';

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

    async create(user: UserDto): Promise<User> {
        this.log.info(`Create user ${JSON.stringify(user)}`);

        const result: User = await this.userRepository.save(User.fromDto(user,
            await this.passwordCryptService.doHash(user.password)));

        this.log.debug(`Persisted user:${JSON.stringify(result)}`);

        return result;
    }
}
