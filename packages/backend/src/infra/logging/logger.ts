import Log4js from 'log4js';

import { Container } from '../../Container';

export const logger = ({ configBuilder }: Container) => {
    const config = configBuilder.getConfig('logger');

    Log4js.configure(config);

    return Log4js.getLogger();
};
