const { execSync } = require('child_process');

try {
    // https://stackoverflow.com/a/31104898
    execSync('tsc --project tsconfig.json', { stdio: [0, 1, 2] });
} catch (error) {
    // Prevent unrelated error log
    process.exit(1);
}
