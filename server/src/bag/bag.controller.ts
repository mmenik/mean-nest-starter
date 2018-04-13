import { Controller, UseInterceptors, HttpCode, Post, Body, HttpStatus, Get, Patch, Delete, Param } from '@nestjs/common';
import { apiPath } from '../../../shared/src/api.path';
import { LogInterceptor } from '../common/interceptors/log.interceptor';
import { ApiUseTags, ApiOperation, ApiResponse, ApiImplicitParam } from '@nestjs/swagger';
import { BagService } from './bag.service';
import { BagModel } from '../../../shared/src/model/bag.model';
import { BagDto } from '../../../shared/src/dto/bag.dto';

@ApiUseTags('Bags')
@UseInterceptors(LogInterceptor)
@Controller(apiPath(1, 'bags'))
export class BagController {
    constructor(private readonly bagService: BagService) { }

    @ApiOperation({ title: 'Get all bags' })
    @ApiResponse({ status: 200, description: 'Find all bag ok, returning list of bags.', type: BagDto, isArray: true })
    @Get()
    async findAll(): Promise<BagModel[]> {
        return await this.bagService.findAll();
    }

    @ApiOperation({ title: 'Create bag' })
    @ApiResponse({ status: 200, description: 'Persist of new bag are ok, returning new bag data.', type: BagDto })
    @HttpCode(HttpStatus.OK)
    @Post()
    async create(@Body() bag: BagDto): Promise<BagModel> {
        return await this.bagService.create(bag);
    }

    @ApiOperation({ title: 'Update bag' })
    @ApiResponse({ status: 200, description: 'Update bag are ok, returning udpdated bag data.', type: BagDto })
    @Patch()
    async update(@Body() bag: BagDto): Promise<BagModel> {
        return await this.bagService.update(bag);
    }

    @ApiOperation({ title: 'Delete bag' })
    @ApiResponse({ status: 200, description: 'Delete bag are ok, returning deleted bag data.', type: BagDto })
    @ApiImplicitParam({ name: 'id' })
    @Delete(':id')
    async delete(@Param() params): Promise<BagModel> {
        return await this.bagService.delete(params.id);
    }
}
