import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BagController } from './bag.controller';
import { BagService } from './bag.service';
import { LogModule } from '../log/log.module';
import { Bag } from './bag.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Bag]),
        LogModule
    ],
    controllers: [BagController],
    components: [BagService],
    exports: [BagService]
})
export class BagModule { }
