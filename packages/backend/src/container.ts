import { createContainer, asClass, asFunction, asValue } from 'awilix';
import { resolve } from 'path';
import { scopePerRequest } from 'awilix-express';

import { ConfigBuilder } from './interfaces/configBuilder';

const configBuilder = new ConfigBuilder(resolve(__dirname, '../', 'config'));
configBuilder.environment = process.env.BOILERPLATE_ENV || 'dev';

import { Application } from './app/Application';
import {
    CreateUser,
    GetAllUsers,
    GetUser,
    UpdateUser,
    DeleteUser
} from './app/user';

import { UserSerializer } from './interfaces/http/user/UserSerializer';

import { Server } from './interfaces/http/Server';
import { router } from './interfaces/http/router';
import { loggerMiddleware } from './interfaces/http/logging/loggerMiddleware';
import { errorHandler } from './interfaces/http/errors/errorHandler';
import { devErrorHandler } from './interfaces/http/errors/devErrorHandler';
import swaggerMiddleware from './interfaces/http/swagger/swaggerMiddleware';

import { logger } from './infra/logging/logger';
import { SequelizeUsersRepository } from './infra/user/SequelizeUsersRepository';
import { database, User as UserModel } from './infra/database/models';

export const container = createContainer();

// System
container.register({
    app: asClass(Application).singleton(),
    server: asClass(Server).singleton(),
}).register({
    router: asFunction(router).singleton(),
    logger: asFunction(logger).singleton(),
}).register({
    configBuilder: asValue(configBuilder),
});

// Middlewares
container.register({
    loggerMiddleware: asFunction(loggerMiddleware).singleton(),
}).register({
    containerMiddleware: asValue(scopePerRequest(container)),
    errorHandler: asValue(configBuilder.environment === 'prod' ? errorHandler : devErrorHandler),
    swaggerMiddleware: asValue([swaggerMiddleware]),
});

// Repositories
container.register({
    usersRepository: asClass(SequelizeUsersRepository).singleton(),
});

// Database
container.register({
    database: asValue(database),
    UserModel: asValue(UserModel),
});

// Operations
container.register({
    createUser: asClass(CreateUser),
    getAllUsers: asClass(GetAllUsers),
    getUser: asClass(GetUser),
    updateUser: asClass(UpdateUser),
    deleteUser: asClass(DeleteUser),
});

// Serializers
container.register({
    userSerializer: asValue(UserSerializer),
});
