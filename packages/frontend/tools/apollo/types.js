#!/usr/bin/env node

const { run } = require('apollo');
const del = require('del');

function generateTypes() {
    del(['**/ApolloTypes/*.ts', '!**/ApolloTypes/globalTypes.ts']);

    run(
        [
            'client:codegen',
            'ApolloTypes',
            '--target',
            'typescript',
            '--localSchemaFile',
            'graphql.schema.json',
            '--globalTypesFile',
            './src/client/modules/common/graphql/ApolloTypes/globalTypes.ts',
            '--includes',
            '**/*{Connect,Graphql}.{ts,tsx}',
            '--passthroughCustomScalars',
            '--customScalarsPrefix',
            'GQL_',
            process.argv.includes('--watch') && '--watch',
        ].filter(Boolean)
    ).catch(error => console.error(error));
}

if (module.parent === null) {
    generateTypes();
}

module.exports = {
    generateTypes,
};
