import { Controller, Post, HttpCode, HttpStatus, Get, Res, Body, BadRequestException, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiUseTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LoginDto } from '../../../shared/src/dto/login.dto';
import { LogInterceptor } from '../common/interceptors/log.interceptor';
import { apiPath } from '../../../shared/src/api.path';

@ApiUseTags('Auth')
@UseInterceptors(LogInterceptor)
@Controller(apiPath(1, 'auth'))
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    @ApiOperation({ title: 'Authorize' })
    @ApiResponse({ status: HttpStatus.OK, description: 'Credential are ok, return JWT.' })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'The email or password is incorrect!.' })
    @Post()
    @HttpCode(HttpStatus.OK)
    public async login(@Body() login: LoginDto) {
        if (await this.authService.authenticateUser(login.username, login.password)) {
            // return res.status(HttpStatus.OK).json(await this.authService.createToken(body.username));
            return await this.authService.createToken(login.username);
        }
        throw new BadRequestException('Incorrect email or password');
        // return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Username or password wrong' });
    }
}
