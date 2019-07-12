#!/usr/bin/env node

const path = require('path');
const fs = require('fs');
const { config } = require('../../config/app');

const IS_CALLED_FROM_SHELL = module.parent === null;

function generateConfig() {
    fs.writeFileSync(
        path.resolve('.graphqlconfig.yml'),
        graphqlConfig('graphql.schema.json', config.api.graphqlEndpoint)
    );

    function graphqlConfig(schemaFile, endpoint) {
        return `schemaPath: ${schemaFile}
extensions:
  endpoints:
    default: ${endpoint}
`;
    }
}

if (IS_CALLED_FROM_SHELL) {
    generateConfig();
}

module.exports = { generateConfig };
