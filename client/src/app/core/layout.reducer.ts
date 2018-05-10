import { Action } from '@ngrx/store';

import * as Layout from './layout.actions';

export interface State {
    isShowSpinner: boolean;
    messageSpinner: string;
    isDarkTheme: boolean;
}

const initialState: State = {
    isShowSpinner: false,
    messageSpinner: '',
    isDarkTheme: false
};

export function layoutReducer(state = initialState, action: Layout.LayoutActions) {
    switch (action.type) {
        case Layout.SHOW_SPINNER:
            return {
                ...state,
                isShowSpinner: true,
                messageSpinner: action.payload
            };
        case Layout.HIDE_SPINNER:
            return {
                ...state,
                isShowSpinner: false
            };
        case Layout.UPDATE_SPINNER:
            return {
                ...state,
                messageSpinner: action.payload

            };
        case Layout.TOGGLE_THEME:
            return {
                ...state,
                isDarkTheme: !state.isDarkTheme
            };
        default:
            return state;
    }
}

export const getIsShowSpinner = (state: State) => state.isShowSpinner;
export const getMessageSpinner = (state: State) => state.messageSpinner;
export const getIsDarkTheme = (state: State) => state.isDarkTheme;
