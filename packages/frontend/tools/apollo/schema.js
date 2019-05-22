#!/usr/bin/env node

const { run } = require('apollo');
const fs = require('fs');
const { config } = require('../../config');

const IS_CALLED_FROM_SHELL = module.parent === null;

function generateSchema() {
    return run(['service:download', 'graphql.schema.json', '--endpoint', config.api.graphqlEndpoint])
        .then(() => {
            // eslint-disable-next-line global-require
            const schema = require('../../graphql.schema');

            // TODO: Remove once WebStorm JS GraphQL plugin learns how to work with apollo-cli generated schema
            // Apollo-cli works fine with this format
            fs.writeFileSync('graphql.schema.json', JSON.stringify({ data: { ...schema } }, undefined, 2), {
                encoding: 'utf-8',
            });
        })
        .catch(error => {
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
