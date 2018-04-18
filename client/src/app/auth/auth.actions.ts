import { Action } from '@ngrx/store';

export const LOGIN = '[Auth] Login';
export const LOGOUT = '[Auth] Logout';
export const RENEW = '[Auth] Renew';

export class Login implements Action {
    readonly type = LOGIN;

    constructor(public payload: { username: string, tokenExpirationDate: Date }) { }
}

export class Logout implements Action {
    readonly type = LOGOUT;
}

export class Renew implements Action {
    readonly type = RENEW;

    constructor(public payload: Date) { }
}

export type AuthActions =
    Login |
    Logout |
    Renew;
