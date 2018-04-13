import { Component, UnprocessableEntityException } from '@nestjs/common';
import { Bag } from './bag.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { LogService } from '../log/log.service';
import { BagDto } from './bag.dto';

@Component()
// tslint:disable-next-line:component-class-suffix
export class BagService {

    constructor(@InjectRepository(Bag) private readonly repositiry: Repository<Bag>,
        private readonly log: LogService) { }

    async findAll(): Promise<Bag[]> {
        this.log.info(`Find all bags`);

        let result: Bag[];
        result = await this.repositiry.find();
        this.log.info(`Bags found ${JSON.stringify(result)}`);

        return result;
    }

    async createOne(bag: BagDto): Promise<Bag> {
        this.log.info(`Bag to create ${JSON.stringify(bag)}`);

        const bagEntity = this.repositiry.create(bag);
        this.log.info(`Bag entity ${JSON.stringify(bagEntity)}`);

        let result: Bag;
        try {
            result = await this.repositiry.save(bagEntity);
            this.log.debug(`Bag created ${JSON.stringify(result)}`);
        } catch (error) {
            throw new UnprocessableEntityException('Validation failed', error);
        }
        return result;
    }

    async updateOne(bag: BagDto): Promise<Bag> {
        this.log.info(`Bag to update ${JSON.stringify(bag)}`);

        const bagToUpdate: Bag = await this.repositiry.findOne(bag.id);
        this.log.info(`Bag found ${JSON.stringify(bagToUpdate)}`);

        await this.repositiry.merge(bagToUpdate, bag);
        this.log.info(`Bag merge ${JSON.stringify(bagToUpdate)}`);

        let result: Bag;
        try {
            result = await this.repositiry.save(bagToUpdate);
            this.log.debug(`Bag updated ${JSON.stringify(result)}`);
        } catch (error) {
            throw new UnprocessableEntityException('Duplicate code', error);
        }

        return result;
    }

    async deleteOne(id: string): Promise<Bag> {
        this.log.info(`Bag id to delete ${id}`);

        let result: Bag;
        try {
            const bagToDelete: Bag = await this.repositiry.findOne(id);
            this.log.info(`Bag found ${JSON.stringify(bagToDelete)}`);

            result = await this.repositiry.remove(bagToDelete);
            this.log.debug(`Bag removed ${JSON.stringify(result)}`);
        } catch (error) {
            throw new UnprocessableEntityException('Invalid bag id format', error);
        }

        return result;
    }
}
