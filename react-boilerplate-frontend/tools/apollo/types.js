#!/usr/bin/env node

const { run } = require('apollo');

run(
    [
        'codegen:generate',
        'ApolloTypes',
        '--target',
        'typescript',
        '--schema',
        'graphql.schema.json',
        '--addTypename',
        '--globalTypesFile',
        './src/client/modules/common/graphql/ApolloTypes/globalTypes.ts',
        '--queries',
        '**/*{Connect,Graphql}.{ts,tsx}',
        '--passthroughCustomScalars',
        '--customScalarsPrefix',
        'GQL_',
        process.argv.includes('--watch') && '--watch',
    ].filter(Boolean)
).catch(error => console.error(error));
