import { Action } from '@ngrx/store';

import { AuthActions, SET_AUTHENTICATED, SET_UNAUTHENTICATED } from './auth.actions';

export interface State {
    isAuthenticated: boolean;
    tokenExpirationDate: Date;
}

const initialState: State = {
    isAuthenticated: false,
    tokenExpirationDate: null
};

export function authReducer(state = initialState, action: AuthActions) {
    switch (action.type) {
        case SET_AUTHENTICATED:
            return {
                ...state,
                isAuthenticated: true,
                tokenExpirationDate: action.payload
            };
        case SET_UNAUTHENTICATED:
            return initialState;
        default: {
            return state;
        }
    }
}

export const getIsAuthenticated = (state: State) => state.isAuthenticated;
export const getTokenExpirationDate = (state: State) => state.tokenExpirationDate;
