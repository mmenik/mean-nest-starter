import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BagSchema } from './bag.schema';
import { BagController } from './bag.controller';
import { BagService } from './bag.service';
import { LogModule } from '../log/log.module';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Bag', schema: BagSchema }]),
        LogModule
    ],
    controllers: [BagController],
    components: [BagService],
    exports: [BagService]
})
export class BagModule { }
