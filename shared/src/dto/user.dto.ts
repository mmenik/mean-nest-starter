import { ApiModelProperty } from '@nestjs/swagger';

export class UserDto {
    @ApiModelProperty()
    readonly _id?: string;
    @ApiModelProperty()
    readonly username: string;
    @ApiModelProperty()
    readonly password: string;
    @ApiModelProperty()
    readonly firstname: string;
    @ApiModelProperty()
    readonly lastname: string;
}
