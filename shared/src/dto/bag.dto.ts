import { ApiModelProperty } from '@nestjs/swagger';

export class BagDto {
    @ApiModelProperty()
    readonly id?: string;
    @ApiModelProperty()
    readonly code: string;
    @ApiModelProperty()
    readonly description: string;
}
