export class Application {
  public server: any;
  public databaseConnector: any;
  public logger: any;

  constructor({ server, databaseConnector, logger }) {
    this.server = server;
    this.databaseConnector = databaseConnector;
    this.logger = logger;
  }

  async start() {
    if (this.databaseConnector) {
      await this.databaseConnector.connect();
    }

    await this.server.start();
  }
}
