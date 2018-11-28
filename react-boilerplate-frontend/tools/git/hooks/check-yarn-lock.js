const { execSync } = require('child_process');

try {
    // https://stackoverflow.com/a/31104898
    execSync('yarn install --frozen-lockfile', { stdio: [0, 1, 2] });
} catch (error) {
    // Prevent unrelated error log
    process.exit(1);
}
