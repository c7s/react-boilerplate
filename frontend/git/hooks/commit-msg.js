const fs = require('fs');
const path = require('path');

const msgFilePath = path.resolve('..', process.env.GIT_PARAMS.split(' ')[0]);
const msgFileContent = fs.readFileSync(msgFilePath, { encoding: 'utf-8' });

const isMsgFormattedCorrectly = /^[A-Z]+-\d+: [A-Z]/.test(msgFileContent) || /^Merge/.test(msgFileContent);
const isDoublePrefix = /^[A-Z]+-\d+: [A-Z]+-\d+/.test(msgFileContent);
const isLongLines = /^.{73,}$/m.test(msgFileContent);

if (isDoublePrefix) {
    terminateWithWarning("You've specified prefix in wrong format while being on task branch");
} else if (!isMsgFormattedCorrectly) {
    terminateWithWarning(`Message must look like 'KP-00: Makes stuff' or 'Merge ...', instead got: ${msgFileContent}`);
} else if (isLongLines) {
    terminateWithWarning('Message lines must not exceed 72 characters');
}

/**
 * @param {string} warning
 */
function terminateWithWarning(warning) {
    console.warn(`[WARN] ${warning}`);
    process.exit(1);
}
