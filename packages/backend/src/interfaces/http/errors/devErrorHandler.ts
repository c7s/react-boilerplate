import { INTERNAL_SERVER_ERROR } from 'http-status';

/* istanbul ignore next */
export const devErrorHandler =  (err, req, res, _next) => { // eslint-disable-line no-unused-vars
  const { logger } = req.container.cradle;

  logger.error(err);

  res.status(INTERNAL_SERVER_ERROR).json({
    type: 'InternalServerError',
    message: err.message,
    stack: err.stack
  });
};
