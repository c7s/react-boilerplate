import express from 'express';
import { createExpressServer } from 'routing-controllers';

import { Container } from '../../container';

export class Server {
  private express: express.Application;
  private config: any;
  private logger: any;

  constructor({ configBuilder, logger, controllers }: Container) {
    this.config = configBuilder.getConfig('server');
    this.logger = logger;
    this.express = createExpressServer({
      controllers,
      routePrefix: '/api',
      development: true,
    });

    this.express.disable('x-powered-by');
  }

  async start(): Promise<void> {
    return new Promise((resolve) => {
      const http = this.express.listen(this.config.port, () => {
        const { port } = http.address() as any;
        this.logger.info(`[pid ${process.pid}] Listening at port ${port}`);
        resolve();
      });
    });
  }
}
