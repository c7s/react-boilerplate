#!/usr/bin/env node

const { generateConfig } = require('./config');
const { generateSchema } = require('./schema');
const { generateTypes } = require('./types');
const { generateOperationRegistry } = require('./operation-registry');

generateSchema().then(() => {
    generateConfig();
    generateTypes();
    generateOperationRegistry();
});
