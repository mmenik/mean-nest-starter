import { Action } from '@ngrx/store';
import { User } from '../../models/user.model';

export enum UserActionTypes {
    SET_USERS = '[User] Set Users',
    ADD_USER = '[User] Add User',
    UPDATE_USER = '[User] Update User',
    DELETE_USER = '[User] Delete User',
}

export class SetUsers implements Action {
    readonly type = UserActionTypes.SET_USERS;

    constructor(public payload: User[]) { }
}

export class AddUser implements Action {
    readonly type = UserActionTypes.ADD_USER;

    constructor(public payload: User) { }
}

export class UpdateUser implements Action {
    readonly type = UserActionTypes.UPDATE_USER;

    constructor(public payload: User) { }
}

export class DeleteUser implements Action {
    readonly type = UserActionTypes.DELETE_USER;

    constructor(public payload: User) { }
}

export type UserActions =
    SetUsers |
    AddUser |
    UpdateUser |
    DeleteUser;
