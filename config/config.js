require('dotenv').config();

const { DATABASE_USERNAME, DATABASE_PASSWORD, DATABASE_NAME } = process.env;

module.exports = {
  development: {
    username: DATABASE_USERNAME,
    password: DATABASE_PASSWORD,
    database: DATABASE_NAME,
    host: '127.0.0.1',
    dialect: 'mysql',
    timezone: '+09:00',
    pool: {
      max: 20,
      min: 5,
      idle: 60000,
    },
  },
  test: {
    username: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  production: {
    username: 'root',
    password: null,
    database: 'database_production',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
};
