import { ModelsLoader } from '../../sequelize';
import Sequelize from 'sequelize';
const { db: config } = require('config');

if (!config) {
    throw new Error('Database configuration not found, disabling database.');
}

const sequelize = new Sequelize(config);

export const { database } = ModelsLoader.load({
    sequelize,
    baseFolder: __dirname
});

export { User } from './User';
