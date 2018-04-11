export const environment = {
    production: false,
    port: 3000,
    dist: 'dist',
    orm: {
        type: 'mongodb',
        host: 'localhost',
        port: '27017',
        database: 'mean-nest-starter',
        entities: ['server/src/**/**.entity{.ts,.js}'],
        synchronize: true
    }
};
