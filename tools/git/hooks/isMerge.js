const { execSync } = require('child_process');

let isMerge = false;
try {
    execSync('git rev-parse -q --verify MERGE_HEAD', { encoding: 'utf-8' });
    isMerge = true;
} catch (error) {
    // Okay, it's not merge
}

module.exports = { isMerge };
