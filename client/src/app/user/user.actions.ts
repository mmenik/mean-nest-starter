import { Action } from '@ngrx/store';
import { UserModel } from './user.model';

export const SET_USERS = '[User] Set Users';
export const ADD_USER = '[User] Add User';
export const UPDATE_USER = '[User] Update User';
export const DELETE_USER = '[User] Delete User';

export class SetUsers implements Action {
    readonly type = SET_USERS;

    constructor(public payload: UserModel[]) { }
}

export class AddUser implements Action {
    readonly type = ADD_USER;

    constructor(public payload: UserModel) { }
}

export class UpdateUser implements Action {
    readonly type = UPDATE_USER;

    constructor(public payload: UserModel) { }
}

export class DeleteUser implements Action {
    readonly type = DELETE_USER;

    constructor(public payload: UserModel) { }
}

export type UserActions =
    SetUsers |
    AddUser |
    UpdateUser |
    DeleteUser;
