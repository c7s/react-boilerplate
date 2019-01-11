process.env.NODE_ENV = process.env.NODE_ENV || 'development';
import { container } from './container';

const app = container.resolve<any>('app');

app.start()
  .catch((error) => {
    app.logger.error(error.stack);
    process.exit();
  });
