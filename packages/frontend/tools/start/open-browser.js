const { exec } = require('child_process');
const { config } = require('../../config');

exec(`start http://localhost:${config.root.devServerPort}`);
