export const environment = {
    production: true,
    port: 3000,
    dist: '',
    orm: {
        type: 'mongodb',
        host: 'localhost',
        port: '27017',
        database: 'mean-nest-starter',
        entities: ['dist/**/**.entity{.ts,.js}'],
        synchronize: false
    }
};
