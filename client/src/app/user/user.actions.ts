import { Action } from '@ngrx/store';
import { UserDto } from '../../../../shared/src/dto/user.dto';

export const SET_USERS = '[User] Set Users';
export const ADD_USER = '[User] Add User';
export const UPDATE_USER = '[User] Update User';
export const DELETE_USER = '[User] Delete User';

export class SetUsers implements Action {
    readonly type = SET_USERS;

    constructor(public payload: UserDto[]) { }
}

export type UserActions =
    SetUsers;
