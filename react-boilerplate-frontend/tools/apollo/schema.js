#!/usr/bin/env node

const { run } = require('apollo');
const config = require('../../config/index');

const apiConfig = config.getConfig(config.CONFIG_NAME.API);

run([
    'schema:download',
    'graphql.schema.json',
    '--endpoint',
    apiConfig.graphqlEndpoint,
    '--header',
    `Authorization: bearer ${apiConfig.githubToken}`,
]).catch(error => console.error(error));
