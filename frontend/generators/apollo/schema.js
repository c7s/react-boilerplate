#!/usr/bin/env node

const { downloadSchema } = require('apollo-codegen');
const config = require('../../config');

let environment;

require('commander')
    .arguments('<environment>')
    .action(environmentName => {
        environment = environmentName;
    })
    .parse(process.argv);

const apiConfig = config.getConfig(config.CONFIG_NAME.API, environment);

downloadSchema(
    apiConfig.graphqlBuildEndpoint || apiConfig.graphqlEndpoint,
    'graphql.schema.json',
    { Authorization: `bearer ${apiConfig.githubToken}` },
    false,
    'post'
)
    .then(result => (result ? console.log(result) : null)) // eslint-disable-line no-console
    .catch(error => {
        console.error('Host is unreachable (check VPN)\n', error);

        process.exit(1);
    });
