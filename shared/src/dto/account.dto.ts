import { LoginDto } from './login.dto';
import { UserDto } from './user.dto';
import { ApiModelProperty } from '@nestjs/swagger';

export class AccountDto {
    @ApiModelProperty()
    readonly user: UserDto;
    @ApiModelProperty()
    readonly login: LoginDto;
}
