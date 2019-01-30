import { RequestHandler } from 'express';

import { Application } from './app/Application';

import { ConfigBuilder } from './infra/configBuilder';
import { Server } from './interfaces/http/Server';
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
    logger: typeof logger;
    configBuilder: ConfigBuilder;
    loggerMiddleware: typeof loggerMiddleware;
    containerMiddleware: RequestHandler;
    errorHandler: typeof errorHandler | typeof devErrorHandler;
    usersRepository: UserRepository;
    databaseConnector: DatabaseConnector;
    UserModel: UserModel;
    controllers: (new () => any)[];
}
