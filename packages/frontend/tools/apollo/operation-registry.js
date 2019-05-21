#!/usr/bin/env node

const { run } = require('apollo');

function generateOperationRegistry() {
    return run(['client:extract', 'operation-registry.json', '--includes', '**/*{Connect,Graphql}.{ts,tsx}']).catch(
        error => console.error(error)
    );
}

if (module.parent === null) {
    generateOperationRegistry();
}

module.exports = { generateOperationRegistry };
