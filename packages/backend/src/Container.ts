import { RequestHandler } from 'express';

import { Application } from './app/Application';
import {
    CreateUser,
    GetAllUsers,
    GetUser,
    UpdateUser,
    DeleteUser
} from './app/user';

import { ConfigBuilder } from './infra/configBuilder';
import { Server } from './interfaces/http/Server';
import { router } from './interfaces/http/router';
import { loggerMiddleware } from './interfaces/http/logging/loggerMiddleware';
import { errorHandler } from './interfaces/http/errors/errorHandler';
import { devErrorHandler } from './interfaces/http/errors/devErrorHandler';
import swaggerMiddleware from './interfaces/http/swagger/swaggerMiddleware';

import { logger } from './infra/logging/logger';
import { SequelizeUsersRepository } from './infra/user/SequelizeUsersRepository';
import { database, User as UserModel } from './infra/database/models';

export interface Container {
    app: Application;
    server: Server;
    router: typeof router;
    logger: typeof logger;
    configBuilder: ConfigBuilder;
    loggerMiddleware: typeof loggerMiddleware;
    containerMiddleware: RequestHandler;
    errorHandler: typeof errorHandler | typeof devErrorHandler;
    swaggerMiddleware: typeof swaggerMiddleware;
    usersRepository: typeof SequelizeUsersRepository;
    database: typeof database;
    UserModel: typeof UserModel;
    createUser: CreateUser;
    getAllUsers: GetAllUsers;
    getUser: GetUser;
    updateUser: UpdateUser;
    deleteUser: DeleteUser;
}
