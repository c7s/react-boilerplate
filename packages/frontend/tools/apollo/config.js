#!/usr/bin/env node

const path = require('path');
const fs = require('fs');
const { config } = require('../../config/index');

fs.writeFileSync(
    path.resolve('graphql.config.json'),
    jsGraphqlPluginConfig('graphql.schema.json', config.api.graphqlEndpoint)
);

fs.writeFileSync(
    path.resolve('.graphqlconfig.yml'),
    vsCodeGraphqlExtensionConfig('graphql.schema.json', config.api.graphqlEndpoint)
);

/**
 * @param {string} schemaFile
 * @param {string} endpoint
 * @return {string}
 * @constructor
 */
function jsGraphqlPluginConfig(schemaFile, endpoint) {
    return `{
    "schema": {
        "file": "${schemaFile}"
    },

    "endpoints": [
        {
            "name": "Default",
            "url": "${endpoint}",
            "options": {
                "headers": {
                    "user-agent": "JS GraphQL"
                }
            }
        }
    ]
}
`;
}

function vsCodeGraphqlExtensionConfig(schemaFile, endpoint) {
    return `schemaPath: ${schemaFile}
extensions:
  endpoints:
    default: ${endpoint}
`;
}
