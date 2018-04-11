import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserDto } from '../../../../shared/src/dto/user.dto';

import * as User from './user.actions';
import * as fromRoot from '../app.reducer';

export interface UserState {
    users: UserDto[];
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
        default:
            return state;
    }
}

export const getUserState = createFeatureSelector<UserState>('user');

export const getUsers = createSelector(getUserState, (state: UserState) => state.users);
