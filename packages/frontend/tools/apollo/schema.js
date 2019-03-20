#!/usr/bin/env node

const { run } = require('apollo');
const { config } = require('../../config');

function generateSchema() {
    return run([
        'service:download',
        'graphql.schema.json',
        '--endpoint',
        config.api.graphqlEndpoint,
        '--header',
        `Authorization: bearer ${config.api.githubToken}`,
    ]).catch(error => console.error(error));
}

if (module.parent === null) {
    generateSchema();
}

module.exports = { generateSchema };
