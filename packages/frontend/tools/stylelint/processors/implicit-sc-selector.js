/** @typedef {{
 *     selectors: string[],
 * }} Options
 */

/**
 * @param {Options} options
 * @return {{code: (function(string): string)}}
 */
function implicitScSelector(options) {
    return {
        code(input) {
            let resultInput = input;
            options.selectors.forEach(selector => {
                resultInput = processSelector(resultInput, selector);
            });

            return resultInput;
        },
    };
}

/**
 * @param {string} input
 * @param {string} selector
 */
function processSelector(input, selector) {
    const selectorRegExp = RegExp(`\\\${ *${selector}`, 'g');
    return input.replace(
        selectorRegExp,
        `/* stylelint-disable-next-line no-duplicate-selectors */
    \${/*sc-selector*/${selector}`
    );
}

module.exports = implicitScSelector;
