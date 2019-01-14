export class Application {
  public server: any;
  public database: any;
  public logger: any;

  constructor({ server, database, logger }) {
    this.server = server;
    this.database = database;
    this.logger = logger;

    if(database && database.options.logging) {
      database.options.logging = logger.info.bind(logger);
    }
  }

  async start() {
    if (this.database) {
      await this.database.authenticate();
    }

    await this.server.start();
  }
}
