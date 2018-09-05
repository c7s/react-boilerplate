#!/usr/bin/env node

const path = require('path');
const fs = require('fs');
const config = require('../../config');

let environment;

require('commander')
    .arguments('<environment>')
    .action(environmentName => {
        environment = environmentName;
    })
    .parse(process.argv);

const apiConfig = config.getConfig(config.CONFIG_NAME.API, environment);

fs.writeFileSync(
    path.resolve('./graphql.config.json'),
    jsGraphqlPluginConfig('graphql.schema.json', apiConfig.graphqlBuildEndpoint || apiConfig.graphqlEndpoint)
);

/**
 * @param {string} schemaFile
 * @param {string} buildEndpoint
 * @return {string}
 * @constructor
 */
function jsGraphqlPluginConfig(schemaFile, buildEndpoint) {
    return `{
    "schema": {
        "file": "${schemaFile}"
    },

    "endpoints": [
        {
            "name": "Default",
            "url": "${buildEndpoint}",
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
