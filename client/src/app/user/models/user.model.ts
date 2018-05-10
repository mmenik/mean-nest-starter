export interface User {
    readonly _id?: string;
    readonly username: string;
    readonly password: string;
    readonly firstname: string;
    readonly lastname: string;
}

// export function generateMockUser(): User {
//     return {
//         _id: '1',
//         username: 'usertest',
//         password: '1234',
//         firstname: 'mirko',
//         lastname: 'menichetti'
//     };
// }
