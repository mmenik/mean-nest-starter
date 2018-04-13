import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserModel } from './user.model';

import * as User from './user.actions';
import * as fromRoot from '../app.reducer';
import { ReturnStatement } from '@angular/compiler';

export interface UserState {
    users: UserModel[];
}

export interface State extends fromRoot.State {
    user: UserState;
}

const initialState: UserState = {
    users: []
};

export function userReducer(state = initialState, action: User.UserActions) {
    switch (action.type) {
        case User.SET_USERS:
            return {
                ...state,
                users: action.payload
            };
        case User.ADD_USER:
            return {
                ...state,
                users: [...state.users, action.payload]
            };
        case User.UPDATE_USER:
            return {
                ...state,
                users: [...state.users].map(user => {
                    if (user._id === action.payload._id) {
                        return { ...user, ...action.payload };
                    }
                    return user;
                })
            };
        case User.DELETE_USER:
            return {
                ...state,
                users: [...state.users].filter(user => user._id !== action.payload._id)
            };
        default:
            return state;
    }
}

export const getUserState = createFeatureSelector<UserState>('user');

export const getUsers = createSelector(getUserState, (state: UserState) => state.users);
