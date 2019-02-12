/** @typedef {{
 *     atRules: string[],
 * }} Options
 */

/**
 * @param {Options} options
 * @return {{code: (function(string): string)}}
 */
function implicitScTags(options) {
    return {
        code(input) {
            let resultInput = input;
            options.atRules.forEach(atRule => {
                resultInput = processAtRule(resultInput, atRule);
            });

            return resultInput;
        },
    };
}

/**
 * @param {string} input
 * @param {string} atRule
 */
function processAtRule(input, atRule) {
    const atRuleRegExp = RegExp(`\\\${ *${atRule}`, 'g');
    return input.replace(atRuleRegExp, `\${/*sc-custom "@media (min-width: 0)"*/${atRule}`);
}

module.exports = implicitScTags;
