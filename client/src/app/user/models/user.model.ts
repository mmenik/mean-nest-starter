export interface User {
    readonly _id?: string;
    readonly username: string;
    readonly password: string;
    firstname: string;
    lastname: string;
}

export function generateMockUsers(): User[] {
    return [{
        _id: '1',
        username: 'username1',
        password: 'passwowrd1',
        firstname: 'firstname1',
        lastname: 'lastname1'
    }, {
        _id: '2',
        username: 'username2',
        password: 'passwowrd2',
        firstname: 'firstname2',
        lastname: 'lastname2'
    }, {
        _id: '3',
        username: 'username3',
        password: 'passwowrd3',
        firstname: 'firstname3',
        lastname: 'lastname3'
    }];
}
