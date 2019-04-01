const open = require('open');
const { config } = require('../../config');

open(`http://localhost:${config.root.devServerPort}`);
