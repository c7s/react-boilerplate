const { exec } = require('child_process');
const config = require('../../config');

const completeConfig = config.getCompleteConfig();

exec(`start http://localhost:${completeConfig.root.devServerPort}`);
