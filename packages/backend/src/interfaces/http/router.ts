import { Router } from 'express';
import cors from 'cors';
const statusMonitor = require('express-status-monitor');
const bodyParser = require('body-parser');
const compression = require('compression');
const methodOverride = require('method-override');

import { Container } from '../../Container';

import { UsersController } from './user/UsersController';

export const router = ({ configBuilder, containerMiddleware, loggerMiddleware, errorHandler, swaggerMiddleware }: Container) => {
  const router = Router();

  /* istanbul ignore if */
  if(configBuilder.environment === 'dev') {
    router.use(statusMonitor());
  }

  /* istanbul ignore if */
  if(configBuilder.environment !== 'qa') {
    router.use(loggerMiddleware);
  }

  const apiRouter = Router();

  apiRouter
    .use(methodOverride('X-HTTP-Method-Override'))
    .use(cors({}))
    .use(bodyParser.json())
    .use(compression())
    .use(containerMiddleware)
    .use('/docs', swaggerMiddleware);

  /*
   * Add your API routes here
   *
   * You can use the `controllers` helper like this:
   * apiRouter.use('/users', controller(controllerPath))
   *
   * The `controllerPath` is relative to the `interfaces/http` folder
   */

  apiRouter.use('/users', UsersController.router);

  router.use('/api', apiRouter);

  router.use(errorHandler);

  return router;
};
