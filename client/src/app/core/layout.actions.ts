import { Action } from '@ngrx/store';

export const SHOW_SPINNER = '[Layout] Show Spinner';
export const HIDE_SPINNER = '[Layout] Hide Spinner';
export const UPDATE_SPINNER = '[Layout] Update Spinner';
export const TOGGLE_THEME = '[Layout] Toggle Theme';

export class ShowSpinner implements Action {
  readonly type = SHOW_SPINNER;

  constructor(public payload: string) { }
}

export class HideSpinner implements Action {
  readonly type = HIDE_SPINNER;
}

export class UpdateSpinner implements Action {
  readonly type = UPDATE_SPINNER;

  constructor(public payload: string) { }
}

export class ToggleTheme implements Action {
  readonly type = TOGGLE_THEME;
}

export type LayoutActions =
  ShowSpinner |
  HideSpinner |
  UpdateSpinner |
  ToggleTheme;
