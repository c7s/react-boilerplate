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

const messageFileName = process.env.GIT_PARAMS.split(' ')[0];

const msgFilePath = path.resolve('..', messageFileName);
const msgFileContent = fs.readFileSync(msgFilePath, { encoding: 'utf-8' });

const isMsgFormattedCorrectly = /^[A-Z]+-\d+: [A-Z]/.test(msgFileContent);
const isDoublePrefix = /^[A-Z]+-\d+: [A-Z]+-\d+/.test(msgFileContent);
const isLongLines = /^.{73,}$/m.test(msgFileContent);
const isHasBody = /^.+\n+.+/.test(msgFileContent);
const isBlankLineAfterSubject = /^.+\n\n.+/.test(msgFileContent);
const isSubjectEndsWithDot = /^.+\.\s*(?:\n|$)/.test(msgFileContent);

if (isDoublePrefix && !isMerge) {
    terminateWithError("You've specified prefix in wrong format while being on task branch");
} else if (!isMsgFormattedCorrectly && !isMerge) {
    terminateWithError(`Message must look like 'KP-00: Makes stuff' or 'Merge ...', instead got: ${msgFileContent}`);
} else if (isLongLines && !isMerge) {
    terminateWithError('Message lines must not exceed 72 characters');
} else if (isHasBody && !isBlankLineAfterSubject && !isMerge) {
    terminateWithError('There must be exactly one blank line between subject and body');
} else if (isSubjectEndsWithDot && !isMerge) {
    terminateWithError('Subject must not end with dot');
}

/**
 * @param {string} warning
 */
function terminateWithError(warning) {
    console.error(`[ERROR] ${warning}`);
    process.exit(1);
}
