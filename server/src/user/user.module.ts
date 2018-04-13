import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { UserService } from './user.service';
import { UserController } from './user.controller';
import { LogModule } from '../log/log.module';
import { UserSchema } from './user.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
        LogModule
    ],
    controllers: [UserController],
    components: [UserService],
    exports: [UserService]
})
export class UserModule { }
