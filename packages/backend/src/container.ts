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

import { logger } from './infra/logging/logger';
import { User as UserModel } from './infra/database/models';
import { DatabaseConnector } from './infra/database/connector';

import { UserRepository } from './infra/user/repository';

export interface Container {
    app: Application;
    server: Server;
    router: typeof router;
    logger: typeof logger;
    configBuilder: ConfigBuilder;
    loggerMiddleware: typeof loggerMiddleware;
    containerMiddleware: RequestHandler;
    errorHandler: typeof errorHandler | typeof devErrorHandler;
    usersRepository: UserRepository;
    databaseConnector: DatabaseConnector;
    UserModel: UserModel;
    createUser: CreateUser;
    getAllUsers: GetAllUsers;
    getUser: GetUser;
    updateUser: UpdateUser;
    deleteUser: DeleteUser;
}
