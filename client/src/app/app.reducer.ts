import { ActionReducerMap, createFeatureSelector, createSelector, ActionReducer, MetaReducer } from '@ngrx/store';
import { environment } from '../environments/environment';

import * as fromAuth from './auth/auth.reducer';
import * as fromLayout from './layout/layout.reducer';

export interface State {
    auth: fromAuth.State;
    layout: fromLayout.State;
}

export const reducers: ActionReducerMap<State> = {
    auth: fromAuth.authReducer,
    layout: fromLayout.layoutReducer
};

export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
    return function (state: State, action: any): State {
        console.log('state:', state);
        console.log('action', action);
        return reducer(state, action);
    };
}

export const metaReducers: MetaReducer<State>[] = !environment.production ? [logger] : [];

export const getAuthState = createFeatureSelector<fromAuth.State>('auth');
export const getIsAuthenticated = createSelector(getAuthState, fromAuth.getIsAuthenticated);
export const getTokenExpirationDate = createSelector(getAuthState, fromAuth.getTokenExpirationDate);

export const getLayoutState = createFeatureSelector<fromLayout.State>('layout');
export const getIsShowSpinner = createSelector(getLayoutState, fromLayout.getIsShowSpinner);
export const getMessageSpinner = createSelector(getLayoutState, fromLayout.getMessageSpinner);
export const getIsDarkTheme = createSelector(getLayoutState, fromLayout.getIsDarkTheme);