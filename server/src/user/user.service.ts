import { Component } from '@nestjs/common';
import { LogService } from '../log/log.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';
import { User } from './user.entity';
import { PasswordCryptService } from '../auth/password/password-crypt.service';
import { UserDto } from '../../../shared/src/dto/user.dto';

@Component()
// tslint:disable-next-line:component-class-suffix
export class UserService {

    constructor(@InjectRepository(User) private readonly repositiry: Repository<User>,
        private readonly passwordCryptService: PasswordCryptService,
        private readonly log: LogService) { }

    async findAll(): Promise<User[]> {
        this.log.info(`Find all users`);

        const result: User[] = await this.repositiry.find();

        result.map(user => this.log.info(`User ${JSON.stringify(user)}`));

        return result;
    }

    async findById(id: number | string): Promise<User> {
        this.log.info(`Find user by id: ${id}`);

        return await this.repositiry.findOne(id);
    }

    async findByUsername(username: string): Promise<User> {
        this.log.info(`Find user by username: ${username}`);

        return await this.repositiry.findOne({ username: username });
    }

    async createOne(user: UserDto): Promise<User> {
        this.log.info(`User to create ${JSON.stringify(user)}`);

        const result: User = await this.repositiry.save(User.fromDto(user,
            await this.passwordCryptService.doHash(user.password)));

        this.log.debug(`User created ${JSON.stringify(result)}`);

        return result;
    }

    async createMany(users: UserDto[]): Promise<User[]> {
        this.log.info(`User to create ${JSON.stringify(users)}`);

        const userMapped: User[] = await Promise.all(users.map(async user =>
            await User.fromDto(user, await this.passwordCryptService.doHash(user.password))
        ));

        const result: User[] = await this.repositiry.save(userMapped);

        this.log.debug(`Users created ${JSON.stringify(result)}`);

        return result;
    }

    async updateOne(user: DeepPartial<UserDto>): Promise<User> {
        this.log.info(`User to update ${JSON.stringify(user)}`);

        const userToUpdate: User = await this.findById(user._id);
        this.log.info(`User fetched ${JSON.stringify(userToUpdate)}`);

        await this.repositiry.merge(userToUpdate, user);
        this.log.info(`User merge ${JSON.stringify(userToUpdate)}`);

        const result: User = this.repositiry.create();
        try {
            await this.repositiry.save(userToUpdate);
            this.log.debug(`User updated ${JSON.stringify(result)}`);
        } catch (error) {
            console.log('Error update:', error);
        }

        return result;
    }

    async deleteOne(id: number | string): Promise<User> {
        this.log.info(`User id to delete ${id}`);

        const userToDelete: User = await this.findById(id);
        this.log.info(`User fetched ${JSON.stringify(userToDelete)}`);

        const result: User = await this.repositiry.remove(userToDelete);
        this.log.debug(`User removed ${JSON.stringify(result)}`);

        return result;
    }
}
