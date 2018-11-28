#!/usr/bin/env node

const { run } = require('apollo');
const { config } = require('../../config');

run([
    'schema:download',
    'graphql.schema.json',
    '--endpoint',
    config.api.graphqlEndpoint,
    '--header',
    `Authorization: bearer ${config.api.githubToken}`,
]).catch(error => console.error(error));
