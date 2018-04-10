import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';
import { User } from './user/user.entity';
import { AccountDto } from '../../shared/src/dto/account.dto';

async function seed() {
    const app = await NestFactory.create(ApplicationModule);

    const userService = app.select(UserModule).get(UserService);

    const users: User[] = await userService.findAll();

    if (users.length === 0) {
        const user: AccountDto = {
            user: {
                lastname: 'admin',
                firstname: 'admin'
            },
            login: {
                username: 'admin',
                password: 'admin'
            }
        };

        userService.create(user);
    }
}
seed();
