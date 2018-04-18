import { Controller, Post, HttpCode, HttpStatus, Get, Req, Res, Body, BadRequestException, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiUseTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { LogInterceptor } from '../common/interceptors/log.interceptor';
import { Observable } from 'rxjs/Observable';
import { apiPath } from '../api.path';
import { LoginDto } from './login.dto';
import { ExtractJwt } from 'passport-jwt';
import * as passport from 'passport';

@ApiBearerAuth()
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
            return Observable.of(await this.authService.createToken(login.username)).delay(500);
        }

        throw new BadRequestException('Incorrect email or password');
    }

    // Bug aperta segnalazione
    // @ApiBearerAuth()
    @ApiOperation({ title: 'Token' })
    @Get('renew')
    public async token(@Req() req) {
        return await this.authService.renewToken(req.headers.authorization.split(' ')[1]);
    }
}
