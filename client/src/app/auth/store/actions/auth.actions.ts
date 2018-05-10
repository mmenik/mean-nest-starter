import { Action } from '@ngrx/store';

export enum AuthActionTypes {
    LOGIN = '[Auth] Login',
    LOGOUT = '[Auth] Logout',
    RENEW = '[Auth] Renew',
}

export class Login implements Action {
    readonly type = AuthActionTypes.LOGIN;

    constructor(public payload: { username: string, tokenExpirationDate: Date }) { }
}

export class Logout implements Action {
    readonly type = AuthActionTypes.LOGOUT;
}

export class Renew implements Action {
    readonly type = AuthActionTypes.RENEW;

    constructor(public payload: Date) { }
}

export type AuthActions =
    Login |
    Logout |
    Renew;
