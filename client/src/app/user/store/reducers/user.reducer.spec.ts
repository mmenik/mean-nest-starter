import * as fromUser from './user.reducer';

describe('UserReducer', () => {
    // const user = generateMockUser();
    // const initialState: fromUser.UserState = {
    //     users: [user]
    // };

    describe('undefined action', () => {
        it('should return the default state', () => {
            const { initialState } = fromUser;
            const action = {} as any;
            const state = fromUser.reducer(undefined, action);

            expect(state).toBe(initialState);
        });
    });
});
