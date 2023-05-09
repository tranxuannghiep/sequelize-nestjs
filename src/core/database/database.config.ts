import * as dotenv from 'dotenv';
import { Dialect } from 'sequelize';
import { DEVELOPMENT, PRODUCTION, TEST } from '../constants';
import { IDatabaseConfig } from './interface/dbConfig.interface';

dotenv.config();

export const databaseConfig: IDatabaseConfig = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME_DEVELOPMENT,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10) || 5433,
    dialect: process.env.DB_DIALECT as Dialect,
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME_TEST,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10) || 5433,
    dialect: process.env.DB_DIALECT as Dialect,
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME_PRODUCTION,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT as Dialect,
  },
};

export const getDatabaseConfig = () => {
  switch (process.env.NODE_ENV) {
    case DEVELOPMENT:
      return databaseConfig.development;
    case TEST:
      return databaseConfig.test;
    case PRODUCTION:
      return databaseConfig.production;
    default:
      return databaseConfig.development;
  }
};
