module.exports = {
  development: {
    username: 'gorod',
    password: '123qwe',
    database: 'test',
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  test: {
    username: 'gorod',
    password: '123qwe',
    database: 'test',
    host: '127.0.0.1',
    dialect: 'postgres',
    logging: null
  },
  production: process.env.DATABASE_URL
};
