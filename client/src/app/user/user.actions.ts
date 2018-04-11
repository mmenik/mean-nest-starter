import { Action } from '@ngrx/store';
import { UserDto } from '../../../../shared/src/dto/user.dto';

export const SET_USERS = '[User] Set Users';

export class SetUsers implements Action {
    readonly type = SET_USERS;

    constructor(public payload: UserDto[]) { }
}

export type UserActions =
    SetUsers;
