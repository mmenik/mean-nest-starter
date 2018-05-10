import { Action } from '@ngrx/store';
import { User } from '../../models/user.model';

export enum UserActionTypes {
    CREATE_USER = '[User] Create User',
    READ_USERS = '[User] Read Users',
    UPDATE_USER = '[User] Update User',
    DELETE_USER = '[User] Delete User',
}

export class CreateUser implements Action {
    readonly type = UserActionTypes.CREATE_USER;

    constructor(public payload: User) { }
}

export class ReadUsers implements Action {
    readonly type = UserActionTypes.READ_USERS;

    constructor(public payload: User[]) { }
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
    CreateUser |
    ReadUsers |
    UpdateUser |
    DeleteUser;
