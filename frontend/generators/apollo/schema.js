#!/usr/bin/env node

const { run } = require('apollo');
const config = require('../../config');

const apiConfig = config.getConfig(config.CONFIG_NAME.API);

run([
    'schema:download',
    'graphql.schema.json',
    '--endpoint',
    apiConfig.graphqlBuildEndpoint || apiConfig.graphqlEndpoint,
    '--header',
    `Authorization: bearer ${apiConfig.githubToken}`,
]).catch(error => console.error(error));
