#!/usr/bin/env node

const { run } = require('apollo');
const glob = require('glob');
const fs = require('fs');

const DELETION_MARK = '// NOTE: This file is marked for deletion';
const IS_CALLED_FROM_SHELL = module.parent === null;

function generateTypes() {
    const oldApolloTypeFiles = getApolloTypeFiles();
    oldApolloTypeFiles.forEach(markFileForDeletion);

    return generateApolloTypeFiles()
        .then(() => {
            oldApolloTypeFiles.forEach(deleteFileIfMarked);
        })
        .catch(error => {
            oldApolloTypeFiles.forEach(unmarkFileForDeletion);

            if (IS_CALLED_FROM_SHELL) {
                console.error(error);
            } else {
                throw error;
            }
        });
}

function getApolloTypeFiles() {
    return glob.sync('**/ApolloTypes/*.ts', { absolute: true });
}

function markFileForDeletion(path) {
    fs.appendFileSync(path, DELETION_MARK);
}

function unmarkFileForDeletion(path) {
    fs.writeFileSync(path, fs.readFileSync(path, { encoding: 'utf-8' }).replace(DELETION_MARK, ''), {
        encoding: 'utf-8',
    });
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
    );
}

if (IS_CALLED_FROM_SHELL) {
    generateTypes();
}

module.exports = {
    generateTypes,
};
