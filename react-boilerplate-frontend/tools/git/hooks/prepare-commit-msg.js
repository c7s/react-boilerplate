const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

let isMerge = false;
try {
    execSync('git --git-dir ../.git rev-parse -q --verify MERGE_HEAD', { encoding: 'utf-8' });
    isMerge = true;
} catch (error) {
    // Okay, it's not merge
}

try {
    const msgPrefixMatch = /([A-Z]+-\d+)/.exec(
        execSync('git --git-dir ../.git symbolic-ref --short HEAD', { encoding: 'utf-8' })
    );

    const messageFileName = process.env.GIT_PARAMS.split(' ')[0];
    const msgFilePath = path.resolve('..', messageFileName);

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
}
