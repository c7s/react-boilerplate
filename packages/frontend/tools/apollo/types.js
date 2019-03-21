#!/usr/bin/env node

const { run } = require('apollo');
const glob = require('glob');
const fs = require('fs');

const DELETION_MARK = '// NOTE: This file is marked for deletion';

function generateTypes() {
    const oldApolloTypeFiles = getApolloTypeFiles();
    oldApolloTypeFiles.forEach(markFileForDeletion);

    generateApolloTypeFiles().then(() => {
        oldApolloTypeFiles.forEach(deleteFileIfMarked);
    });
}

function getApolloTypeFiles() {
    return glob.sync('**/ApolloTypes/*.ts', { absolute: true });
}

function markFileForDeletion(path) {
    fs.appendFileSync(path, DELETION_MARK);
}

function deleteFileIfMarked(path) {
    if (fs.readFileSync(path, { encoding: 'utf-8' }).includes(DELETION_MARK)) {
        fs.unlinkSync(path);
    }
}

function generateApolloTypeFiles() {
    return run(
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
