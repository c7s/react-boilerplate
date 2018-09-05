#!/usr/bin/env node

const glob = require('glob');
const path = require('path');
const fs = require('fs');
const lodash = require('lodash');
const { generate } = require('apollo-codegen');
const program = require('commander');
const apolloHelpers = require('./helpers');

program
    .arguments('<environment>')
    .option('-d, --directory <path>', 'Specify directory (absolute) to generate types only for it')
    .parse(process.argv);

if (program.directory) {
    generateTypesForDirectory(program.directory);
} else {
    const files = glob.sync(`src/client/**/!(*.assembled).graphql`);
    lodash.uniq(files.map(file => path.dirname(file))).forEach(generateTypesForDirectory);
}

/**
 * @param {string} directory
 */
function generateTypesForDirectory(directory) {
    generateResultTypes(directory);
    generateDocumentNodeTypes(directory);
}

/**
 * @param {string} directory
 */
function generateResultTypes(directory) {
    const files = glob.sync(`${directory}/**/!(*.assembled).graphql`);
    const dirList = lodash.uniq([
        ...files
            .map(apolloHelpers.extractFragmentImports)
            .reduce((prev, next) => [...prev, ...next], [])
            .map(path.dirname),
        directory,
    ]);

    const dirPart = dirList.length > 1 ? `{${dirList.join(',')}}` : dirList[0];

    const fileGlob = `${dirPart}/**/!(*.assembled).graphql`;
    const outputFile = `${directory}/${
        path.basename(directory) !== 'graphql' ? path.basename(directory) : ''
    }ApolloType.ts`;

    const subFiles = glob.sync(fileGlob);
    generate(
        subFiles,
        path.resolve('graphql.schema.json'),
        path.resolve(outputFile),
        undefined,
        'typescript',
        'gql',
        undefined,
        {
            passthroughCustomScalars: false,
            customScalarsPrefix: '',
            addTypename: true,
            namespace: undefined,
            operationIdsPath: null,
            generateOperationIds: false,
            mergeInFieldsFromFragmentSpreads: true,
            useFlowExactObjects: false,
        }
    );
}

/**
 * @param {string} directory
 */
function generateDocumentNodeTypes(directory) {
    const files = glob.sync(`${directory}/**/*Graphql!(*.assembled).graphql`);
    files.forEach(generateDocumentNodeTypesForFile);
}

/**
 * @param {string} file
 */
function generateDocumentNodeTypesForFile(file) {
    const queriesAndMutationsList = apolloHelpers.extractQueriesAndMutations(file);

    fs.writeFileSync(
        `${path.join(path.dirname(file), path.basename(file, path.extname(file)))}.d.ts`,
        queriesAndMutationsList.length > 1
            ? graphqlTypesMultiple(queriesAndMutationsList)
            : graphqlTypesSingle(queriesAndMutationsList[0])
    );
}

/**
 * @param {string[]} nameList
 * @return {string}
 * @constructor
 */
function graphqlTypesMultiple(nameList) {
    return `import { DocumentNode } from 'graphql';

export = Graphql;

declare namespace Graphql {
    ${nameList.map(name => `const ${name}: DocumentNode;`).join('\n    ')}
}
`;
}

/**
 * @param {string} name
 * @return {string}
 * @constructor
 */
function graphqlTypesSingle(name) {
    return `import { DocumentNode } from 'graphql';
declare const ${name}: DocumentNode;
export = ${name};
`;
}

/**
 * @param {string} content
 * @return {string}
 */
function generateTypesForDirectoryLoader(content) {
    this.cacheable(true);
    generateTypesForDirectory(this.context);
    return content;
}

module.exports = generateTypesForDirectoryLoader;
