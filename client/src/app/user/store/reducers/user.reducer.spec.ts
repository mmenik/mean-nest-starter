import * as fromUser from './user.reducer';
import { User, generateMockUsers } from '../../models/user.model';
import { ReadUsers, CreateUser, UpdateUser, DeleteUser } from '../actions/user.actions';

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

    describe('read action', () => {
        it('should populate the users array', () => {
            const users: User[] = generateMockUsers();
            const { initialState } = fromUser;
            const action = new ReadUsers(users);
            const state = fromUser.reducer(initialState, action);

            expect(state.users).toEqual(users);
        });
    });

    describe('create action', () => {
        it('should add the new user to users array', () => {
            const users: User[] = [generateMockUsers()[0], generateMockUsers()[1]];
            const user: User = generateMockUsers()[2];
            const { initialState } = fromUser;
            const previousState = { ...initialState, users };
            const action = new CreateUser(user);
            const state = fromUser.reducer(previousState, action);

            expect(state.users.length).toEqual(3);
            expect(state.users).toEqual([...users, user]);
        });
    });

    describe('update action', () => {
        it('should update user in users array', () => {
            const users: User[] = generateMockUsers();
            const user: User = generateMockUsers()[2];
            user.lastname = 'updatelastname';
            user.firstname = 'updatefirstname';

            const { initialState } = fromUser;
            const previousState = { ...initialState, users };
            const action = new UpdateUser(user);
            const state = fromUser.reducer(previousState, action);
            console.log('state');
            console.log(state.users);
            console.log('user');
            console.log({ ...users, ...user });
            expect(state.users.length).toEqual(3);
            // expect(state.users).toEqual([...users, user]);
        });
    });
});
