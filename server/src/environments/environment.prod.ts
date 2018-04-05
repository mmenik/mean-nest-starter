export const environment = {
    production: true,
    port: 3000,
    dist: '',
    orm: {
        type: 'mongodb',
        host: 'localhost',
        port: '27017',
        database: 'nest',
        entities: ['dist/server/src/**/**.entity{.ts,.js}'],
        synchronize: false
    }
};
