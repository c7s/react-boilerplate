const { execSync } = require('child_process');

execSync('yarn install --frozen-lockfile', { encoding: 'utf-8' });
