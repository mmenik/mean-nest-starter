import { Controller, Body, Post, HttpCode, HttpStatus, Get, UseInterceptors, Put, Delete, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiUseTags, ApiBearerAuth, ApiImplicitParam, ApiImplicitQuery } from '@nestjs/swagger';
import { UserService } from './user.service';
import { LogService } from '../log/log.service';
import { LogInterceptor } from '../common/interceptors/log.interceptor';
import { UserModel } from './user.model';
import { UserDto } from './user.dto';
import { apiPath } from '../api.path';

@ApiBearerAuth()
@ApiUseTags('Users')
@UseInterceptors(LogInterceptor)
@Controller(apiPath(1, 'users'))
export class UserController {

    constructor(private readonly userService: UserService, private readonly log: LogService) { }

    @ApiOperation({ title: 'Get all users' })
    @ApiResponse({ status: 200, description: 'Find all users ok, returning list of user.', type: UserDto, isArray: true })
    @Get()
    async findAll(): Promise<UserModel[]> {
        return await this.userService.findAll();
    }

    @ApiOperation({ title: 'Create user' })
    @ApiResponse({ status: 200, description: 'Persist of new user are ok, returning new user data.', type: UserDto })
    @ApiResponse({ status: 400, description: 'Email or password are not valid!' })
    @HttpCode(HttpStatus.OK)
    @Post()
    async create(@Body() user: UserDto): Promise<UserModel> {
        return await this.userService.createOne(user);
    }

    @ApiOperation({ title: 'Update user' })
    @ApiResponse({ status: 200, description: 'Update user are ok, returning udpdated user data.', type: UserDto })
    @Put()
    async update(@Body() user: UserDto): Promise<UserModel> {
        return await this.userService.updateOne(user);
    }

    @ApiOperation({ title: 'Delete user' })
    @ApiResponse({ status: 200, description: 'Delete user are ok, returning deleted user data.', type: UserDto })
    @ApiImplicitParam({ name: 'id' })
    @Delete(':id')
    async delete(@Param() params): Promise<UserModel> {
        return await this.userService.deleteOne(params.id);
    }
}
