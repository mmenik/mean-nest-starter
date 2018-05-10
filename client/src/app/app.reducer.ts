import { ActionReducerMap, createFeatureSelector, createSelector, ActionReducer, MetaReducer } from '@ngrx/store';
import { environment } from '../environments/environment';

/**
 * storeFreeze prevents state from being mutated. When mutation occurs, an
 * exception will be thrown. This is useful during development mode to
 * ensure that none of the reducers accidentally mutates the state.
 */
import { storeFreeze } from 'ngrx-store-freeze';

import * as fromAuth from './auth/store/reducers/auth.reducer';
import * as fromLayout from './core/store/reducers/layout.reducer';

export interface State {
    auth: fromAuth.State;
    layout: fromLayout.State;
}

export const reducers: ActionReducerMap<State> = {
    auth: fromAuth.reducer,
    layout: fromLayout.reducer,
};

export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
    return function (state: State, action: any): State {
        console.log('state:', state);
        console.log('action', action);
        return reducer(state, action);
    };
}

export const metaReducers: MetaReducer<State>[] = !environment.production
    ? [logger, storeFreeze]
    : [];

export const getAuthState = createFeatureSelector<fromAuth.State>('auth');
export const getUseranme = createSelector(getAuthState, fromAuth.getUsername);
export const getIsAuthenticated = createSelector(getAuthState, fromAuth.getIsAuthenticated);
export const getTokenExpirationDate = createSelector(getAuthState, fromAuth.getTokenExpirationDate);

export const getLayoutState = createFeatureSelector<fromLayout.State>('layout');
export const getIsShowSpinner = createSelector(getLayoutState, fromLayout.getIsShowSpinner);
export const getMessageSpinner = createSelector(getLayoutState, fromLayout.getMessageSpinner);
export const getIsDarkTheme = createSelector(getLayoutState, fromLayout.getIsDarkTheme);
