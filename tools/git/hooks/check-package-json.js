const packageJson = require('../../../package');

if (packageJson.dependencies) {
    console.error("[ERROR] Project root can't have dependencies, use devDependencies instead");
    process.exit(1);
}
