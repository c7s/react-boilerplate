const { execSync } = require('child_process');

execSync('tsc --project tsconfig.json', { encoding: 'utf-8' });
