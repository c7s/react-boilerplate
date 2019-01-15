import { container } from './containerCreate';

const app = container.resolve<any>('app');

app.start()
  .catch(error => {
    app.logger.error(error.stack);
    process.exit();
  });
