#!/usr/bin/env node

const { run } = require('apollo');
const { config } = require('../../config/app');

const IS_CALLED_FROM_SHELL = module.parent === null;

function generateSchema() {
    return run(['service:download', 'graphql.schema.json', '--endpoint', config.api.graphqlEndpoint]).catch(error => {
        if (IS_CALLED_FROM_SHELL) {
            console.error(error);
        } else {
            throw error;
        }
    });
}

if (IS_CALLED_FROM_SHELL) {
    generateSchema();
}

module.exports = { generateSchema };
