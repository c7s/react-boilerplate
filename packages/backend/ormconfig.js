const { resolve } = require('path');
const { ConfigBuilder } = require('./dist/infra/configBuilder');

const configBuilder = new ConfigBuilder(resolve(__dirname, 'config'), {
    env: process.env.DC_ENV,
});

module.exports = configBuilder.getConfig('database');
