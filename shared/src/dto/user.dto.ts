import { ApiModelProperty } from '@nestjs/swagger';
import { ObjectID } from 'typeorm';

export class UserDto {
    @ApiModelProperty()
    readonly id: string;
    @ApiModelProperty()
    readonly username: string;
    @ApiModelProperty()
    readonly password: string;
    @ApiModelProperty()
    readonly firstname: string;
    @ApiModelProperty()
    readonly lastname: string;
}
