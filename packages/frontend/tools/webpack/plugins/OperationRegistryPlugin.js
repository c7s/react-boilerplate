const { run } = require('apollo');

class OperationRegistryPlugin {
    static generateOperationRegistry(filename) {
        return run(['client:extract', filename, '--includes', '**/*{Connect,Graphql}.{ts,tsx}']).catch(error =>
            console.error(error)
        );
    }

    constructor({ filename }) {
        this.filename = filename;
    }

    apply(compiler) {
        const plugin = { name: 'OperationRegistryPlugin' };

        compiler.hooks.emit.tapAsync(plugin, async (_, callback) => {
            await OperationRegistryPlugin.generateOperationRegistry(this.filename);
            callback();
        });
    }
}

module.exports = OperationRegistryPlugin;
