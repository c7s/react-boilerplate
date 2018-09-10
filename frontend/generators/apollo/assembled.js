#!/usr/bin/env node

const glob = require('glob');
const path = require('path');
const fs = require('fs');
const program = require('commander');
const apolloHelpers = require('./helpers');

program.option('-f, --file <path>', 'Specify file path (absolute) to assemble').parse(process.argv);

if (program.file) {
    generateAssembledFile(program.file);
} else {
    const files = glob.sync('**/!(*.assembled).graphql');
    files.forEach(generateAssembledFile);
}

/**
 * @param {string} filePath
 */
function generateAssembledFile(filePath) {
    const fileDir = path.dirname(filePath);
    const fileName = path.basename(filePath, path.extname(filePath));
    const importList = apolloHelpers.extractFragmentImports(filePath);
    const assembledFilePath = path.join(fileDir, `${fileName}.assembled${path.extname(filePath)}`);

    if (importList.length) {
        fs.writeFileSync(
            assembledFilePath,
            `${importList.map(pathInner => fs.readFileSync(pathInner, { encoding: 'utf-8' })).join('\n\n')}
${fs.readFileSync(filePath, { encoding: 'utf-8' })}`
        );
    } else if (fs.existsSync(assembledFilePath)) {
        fs.unlinkSync(assembledFilePath);
    }
}
