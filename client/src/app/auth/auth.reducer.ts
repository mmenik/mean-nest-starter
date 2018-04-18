import { Action } from '@ngrx/store';

import * as Auth from './auth.actions';

export interface State {
    isAuthenticated: boolean;
    username: string;
    tokenExpirationDate: Date;
}

const initialState: State = {
    isAuthenticated: false,
    username: null,
    tokenExpirationDate: null
};

export function authReducer(state = initialState, action: Auth.AuthActions) {
    switch (action.type) {
        case Auth.LOGIN:
            return {
                ...state,
                isAuthenticated: true,
                username: action.payload.username,
                tokenExpirationDate: action.payload.tokenExpirationDate
            };
        case Auth.LOGOUT:
            return initialState;
        case Auth.RENEW:
            return {
                ...state,
                tokenExpirationDate: action.payload
            };
        default: {
            return state;
        }
    }
}

export const getUsername = (state: State) => state.username;
export const getIsAuthenticated = (state: State) => state.isAuthenticated;
export const getTokenExpirationDate = (state: State) => state.tokenExpirationDate;
