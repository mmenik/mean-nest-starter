import { UserActionTypes, ReadUsers, CreateUser, UpdateUser, DeleteUser } from './user.actions';
import { User, generateMockUsers } from '../../models/user.model';

describe('UserActions', () => {
    it('should create set users action', () => {
        const payload: User[] = [];
        const action = new ReadUsers(payload);

        expect({ ...action }).toEqual({
            type: UserActionTypes.READ_USERS,
            payload,
        });
    });

    it('should create add user action', () => {
        const payload: User = generateMockUsers()[0];
        const action = new CreateUser(payload);

        expect({ ...action }).toEqual({
            type: UserActionTypes.CREATE_USER,
            payload
        });
    });

    it('should create update user action', () => {
        const payload: User = generateMockUsers()[0];
        const action = new UpdateUser(payload);

        expect({ ...action }).toEqual({
            type: UserActionTypes.UPDATE_USER,
            payload
        });
    });

    it('should create delete user action', () => {
        const payload: User = generateMockUsers()[0];
        const action = new DeleteUser(payload);

        expect({ ...action }).toEqual({
            type: UserActionTypes.DELETE_USER,
            payload
        });
    });
});
