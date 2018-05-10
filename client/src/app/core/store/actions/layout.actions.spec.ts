import { LayoutActionTypes, ShowSpinner, HideSpinner, UpdateSpinner, ToggleTheme } from '../actions/layout.actions';

describe('LayoutActions', () => {
    it('should create show spinner action', () => {
        const payload = 'test spinner';
        const action = new ShowSpinner(payload);

        expect({ ...action }).toEqual({
            type: LayoutActionTypes.SHOW_SPINNER,
            payload,
        });
    });

    it('should create hide spinner action', () => {
        const action = new HideSpinner();

        expect({ ...action }).toEqual({
            type: LayoutActionTypes.HIDE_SPINNER,
        });
    });

    it('should create update spinner action', () => {
        const payload = 'test spinner';
        const action = new UpdateSpinner(payload);

        expect({ ...action }).toEqual({
            type: LayoutActionTypes.UPDATE_SPINNER,
            payload,
        });
    });

    it('should create toggle theme action', () => {
        const action = new ToggleTheme();

        expect({ ...action }).toEqual({
            type: LayoutActionTypes.TOGGLE_THEME,
        });
    });
});
