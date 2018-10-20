const { merge } = require('lodash');
const config = require('./config');

try {
    // eslint-disable-next-line global-require
    const localConfig = require('./local');
    merge(config, localConfig);
} catch (e) {
    // Okay, no local config
}

module.exports = { config };
