import { ApiModelProperty } from '@nestjs/swagger';

export class LoginDto {
    @ApiModelProperty()
    readonly username: string;
    @ApiModelProperty()
    readonly password: string;
}
