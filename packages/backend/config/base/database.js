const { resolve } = require('path');

const entitiesDir = resolve(__dirname, '../../', 'dist/infra/database/models/*.js');
const migrationsDir = resolve(__dirname, '../../', 'dist/infra/database/migrate/*.js');

module.exports = {
    name: 'default',
    username: 'gorod',
    password: '123qwe',
    database: 'test',
    host: '127.0.0.1',
    type: 'postgres',
    entities: [entitiesDir],
    migrations: [migrationsDir],
    cache: {
        type: 'redis',
        oprions: {
            host: '127.0.0.1',
            port: 6379,
        },
    },
};
