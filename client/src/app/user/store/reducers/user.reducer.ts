import { createFeatureSelector, createSelector } from '@ngrx/store';
import { User } from '../../models/user.model';

import { UserActionTypes, UserActions } from '../actions/user.actions';
import * as fromRoot from '../../../app.reducer';

export interface UserState {
    users: User[];
}

export interface State extends fromRoot.State {
    user: UserState;
}

export const initialState: UserState = {
    users: []
};

export function reducer(state = initialState, action: UserActions) {
    switch (action.type) {
        case UserActionTypes.CREATE_USER:
            return {
                ...state,
                users: [...state.users, action.payload]
            };
        case UserActionTypes.READ_USERS:
            return {
                ...state,
                users: action.payload
            };
        case UserActionTypes.UPDATE_USER:
            return {
                ...state,
                users: [...state.users].map(user => {
                    if (user._id === action.payload._id) {
                        return { ...user, ...action.payload };
                    }
                    return user;
                })
            };
        case UserActionTypes.DELETE_USER:
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
