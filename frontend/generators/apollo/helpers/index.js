const fs = require('fs');
const path = require('path');

/**
 * @param {string} filePath
 * @return {string[]}
 */
function extractFragmentImports(filePath) {
    const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' });

    const importRegExp = /#import ["'](.+)["']/g;
    let match;
    const result = [];
    do {
        match = importRegExp.exec(fileContent);
        if (match) {
            result.push(path.join(path.dirname(filePath), match[1]));
        }
    } while (match);

    return result;
}

/**
 * @param {string} filePath
 * @return {string[]}
 */
function extractQueriesAndMutations(filePath) {
    const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' });

    const importRegExp = /^(?:query|mutation) (.+?)[( ]/gm;
    let match;
    const result = [];
    do {
        match = importRegExp.exec(fileContent);
        if (match) {
            result.push(match[1]);
        }
    } while (match);

    return result;
}

module.exports = {
    extractFragmentImports,
    extractQueriesAndMutations,
};
