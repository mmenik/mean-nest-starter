import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';
import { User } from './user/user.entity';
import { UserDto } from '../../shared/src/dto/user.dto';

async function seed() {
    const app = await NestFactory.create(ApplicationModule);

    const userService = app.select(UserModule).get(UserService);

    const all: User[] = await userService.findAll();

    if (all.length === 0) {
        const users: UserDto[] = [{
            lastname: 'mirko',
            firstname: 'menichetti',
            username: 'admin',
            password: 'admin'
        },
        {
            lastname: 'maurizio',
            firstname: 'ragni',
            username: 'service',
            password: 'service'
        }];

        await userService.createMany(users);
    }
}
seed();
