const open = require('open');
const { config } = require('../../config/dev-server');

open(`http://localhost:${config.port}`);
