const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

try {
    const msgPrefixMatch = /([A-Z]+-\d+)/.exec(
        execSync('git --git-dir ../.git symbolic-ref --short HEAD', { encoding: 'utf-8' })
    );

    const msgFilePath = path.resolve('..', process.env.GIT_PARAMS.split(' ')[0]);
    const msgFileContent = fs.readFileSync(msgFilePath, { encoding: 'utf-8' });

    const isAlreadyWithPrefix = /^[A-Z]+-\d+: /.test(msgFileContent);
    const isMerge = /^Merge/.test(msgFileContent);

    let msgPrefix = '';
    if (msgPrefixMatch && !isAlreadyWithPrefix && !isMerge) {
        msgPrefix = `${msgPrefixMatch[1]}: `;
    } else if (msgPrefixMatch && isAlreadyWithPrefix) {
        console.warn(`[WARN] You shouldn't specify prefix while being on task branch`);
    }

    fs.writeFileSync(msgFilePath, `${msgPrefix}${msgFileContent}`);
} catch (error) {
    console.warn('[WARN] Something unusual is happening, commit message will not be prepared');
}
