import { createContainer, asClass, asFunction, asValue } from 'awilix';
import { resolve } from 'path';
import { scopePerRequest } from 'awilix-express';
import { getCustomRepository } from 'typeorm';

import { ConfigBuilder } from './infra/configBuilder';

const configBuilder = new ConfigBuilder(resolve(__dirname, '../', 'config'), {
    env: process.env.BOILERPLATE_ENV || 'dev',
});

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
import { loggerMiddleware } from './interfaces/http/logging/loggerMiddleware';
import { errorHandler } from './interfaces/http/errors/errorHandler';
import { devErrorHandler } from './interfaces/http/errors/devErrorHandler';

import { logger } from './infra/logging/logger';
import { User as UserModel } from './infra/database/models';
import { DatabaseConnector } from './infra/database/connector';
import { UserRepository } from './infra/user/repository';

import { UserController } from './app/controllers';

export const container = createContainer();

// System
container.register({
    app: asClass(Application).singleton(),
    server: asClass(Server).singleton(),
}).register({
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
});

// Repositories
container.register({
    usersRepository: asFunction(getCustomRepository.bind(undefined, UserRepository, undefined)),
});

// Database
container.register({
    databaseConnector: asClass(DatabaseConnector).singleton(),
    UserModel: asValue(UserModel),
});

// controllers
container.register({
    controllers: asValue([UserController]),
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
