const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { isMerge } = require('./isMerge');

try {
    const msgPrefixMatch = /([A-Z]+-\d+)/.exec(execSync('git symbolic-ref --short HEAD', { encoding: 'utf-8' }));

    const messageFileName = process.env.HUSKY_GIT_PARAMS.split(' ')[0];
    const msgFilePath = path.resolve(messageFileName);

    const msgFileContent = fs.readFileSync(msgFilePath, { encoding: 'utf-8' });

    const isAlreadyWithPrefix = /^[A-Z]+-\d+: /.test(msgFileContent);

    let msgPrefix = '';
    if (msgPrefixMatch && !isAlreadyWithPrefix && !isMerge) {
        msgPrefix = `${msgPrefixMatch[1]}: `;
    } else if (msgPrefixMatch && isAlreadyWithPrefix) {
        console.warn(`[WARN] You shouldn't specify prefix while being on task branch`);
    }

    fs.writeFileSync(msgFilePath, `${msgPrefix}${msgFileContent}`);
} catch (error) {
    console.warn('[WARN] Something unusual is happening, commit message will not be prepared');
    console.warn(`[WARN] ${error}`);
}
