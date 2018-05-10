import { Action } from '@ngrx/store';

import { AuthActionTypes, AuthActions } from '../actions/auth.actions';

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

export function reducer(state = initialState, action: AuthActions) {
    switch (action.type) {
        case AuthActionTypes.LOGIN:
            return {
                ...state,
                isAuthenticated: true,
                username: action.payload.username,
                tokenExpirationDate: action.payload.tokenExpirationDate
            };
        case AuthActionTypes.LOGOUT:
            return initialState;
        case AuthActionTypes.RENEW:
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
