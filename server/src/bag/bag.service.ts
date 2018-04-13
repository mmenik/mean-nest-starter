import { Component, UnprocessableEntityException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BagSchema } from './bag.schema';
import { MongoError } from 'mongodb';
import { BagModel } from '../../../shared/src/model/bag.model';
import { BagDto } from '../../../shared/src/dto/bag.dto';

@Component()
// tslint:disable-next-line:component-class-suffix
export class BagService {
    constructor(@InjectModel(BagSchema) private readonly bagModel: Model<BagModel>) { }

    async findAll(): Promise<BagModel[]> {
        return await this.bagModel.find().exec();
    }

    async create(bag: BagDto): Promise<BagModel> {
        const createdBag = new this.bagModel(bag);
        let result: BagModel;
        try {
            result = await createdBag.save();
        } catch (error) {
            throw new UnprocessableEntityException('Validation failed', error);
        }
        return result;
    }

    async update(bag: BagDto): Promise<BagModel> {
        try {
            return await this.bagModel.findByIdAndUpdate(bag.id, bag, { new: true }).exec();
        } catch (error) {
            throw new UnprocessableEntityException('Duplicate code', error);
        }
    }

    async delete(id: string): Promise<BagModel> {
        try {
            return await this.bagModel.findByIdAndRemove(id).exec();
        } catch (error) {
            throw new UnprocessableEntityException('Invalid bag id format', error);
        }
    }
}
