import { ApiModelProperty } from '@nestjs/swagger';

export class UserDto {
    @ApiModelProperty()
    readonly firstname: string;
    @ApiModelProperty()
    readonly lastname: string;
}
