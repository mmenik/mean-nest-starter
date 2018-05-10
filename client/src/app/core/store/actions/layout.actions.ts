import { Action } from '@ngrx/store';

export enum LayoutActionTypes {
  SHOW_SPINNER = '[Layout] Show Spinner',
  HIDE_SPINNER = '[Layout] Hide Spinner',
  UPDATE_SPINNER = '[Layout] Update Spinner',
  TOGGLE_THEME = '[Layout] Toggle Theme',
}

export class ShowSpinner implements Action {
  readonly type = LayoutActionTypes.SHOW_SPINNER;

  constructor(public payload: string) { }
}

export class HideSpinner implements Action {
  readonly type = LayoutActionTypes.HIDE_SPINNER;
}

export class UpdateSpinner implements Action {
  readonly type = LayoutActionTypes.UPDATE_SPINNER;

  constructor(public payload: string) { }
}

export class ToggleTheme implements Action {
  readonly type = LayoutActionTypes.TOGGLE_THEME;
}

export type LayoutActions =
  ShowSpinner |
  HideSpinner |
  UpdateSpinner |
  ToggleTheme;
