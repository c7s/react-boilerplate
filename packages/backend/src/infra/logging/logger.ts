import Log4js from 'log4js';

export const logger = ({ config }) => {
  Log4js.configure(config.logging);

  return Log4js.getLogger();
};
