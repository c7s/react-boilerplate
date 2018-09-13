#!/usr/bin/env node

// TODO: fix eslint errors
/* eslint-disable */

const path = require('path');
const fs = require('fs');
const mkdirp = require('mkdirp');
const prompt = require('prompt');
const intersection = require('lodash/intersection');
const isEmpty = require('lodash/isEmpty');
const flatten = require('lodash/flatten');
const compose = require('lodash/fp/compose');
const pickBy = require('lodash/pickBy');
const prettier = require('prettier');

/** @enum {string} */
const Enhancers = {
    STORE: 'Store',
    APOLLO: 'Apollo',
    BEHAVIOUR: 'Behaviour',
    THEME: 'Theme',
    UPDATE_CONDITION: 'UpdateCondition',
};

let moduleNameGlobal;
let componentNameGlobal;

try {
    const program = require('commander')
        .version('2.0.0')
        .description(
            'I.e.:           yarn generate:component development Test --add-enhancers store,behaviour\n' +
                '  Same shortened: yarn g:c development Test -a s,b\n' +
                '\n  This component generator must be used ' +
                'for component generation and adding or removing enhancers. No adding or removing enhancers ' +
                'bypassing this generator is allowed.'
        )
        .arguments('<component-module> <component-name>')
        .action((module, name) => {
            moduleNameGlobal = validateModuleName(module);
            componentNameGlobal = validateComponentName(name);
        })
        .option(
            '-a, --add-enhancers <items>',
            `Comma-separated enhancers (case-insensitive): ${objectIntoCommaSeparatedValueFirstLetters(
                Enhancers
            )} or ${objectIntoCommaSeparatedLoweredValues(Enhancers)}`,
            getListOfEnhancersFromArgs
        )
        .option(
            '-r, --remove-enhancers <items>',
            `Comma-separated enhancers (case-insensitive): ${objectIntoCommaSeparatedValueFirstLetters(
                Enhancers
            )} or ${objectIntoCommaSeparatedLoweredValues(Enhancers)}`,
            getListOfEnhancersFromArgs
        )
        .parse(process.argv);

    if (process.argv.length < 3) {
        program.help();
    }

    createComponent(moduleNameGlobal, componentNameGlobal, program);
} catch (error) {
    console.error(error.message);
}

/**
 * @typedef {{
 *     removeEnhancers: string[],
 *     addEnhancers: string[]
 * }} Arguments
 */

/**
 * @param {string} moduleName
 * @param {string} componentName
 * @param {Arguments} program
 */
async function createComponent(moduleName, componentName, program) {
    try {
        checkArgumentsSanity(program);
        await prepareDirectory(moduleName, componentName);
        removeFiles(moduleName, componentName, program.removeEnhancers || []);

        const currentEnhancers = reorderEnhancers(
            addEnhancersFromFileSystem(moduleName, componentName, program.addEnhancers || [])
        );
        getAffectedFilesList(moduleName, componentName, currentEnhancers).forEach(async function(filename) {
            return processFile(moduleName, componentName, filename, currentEnhancers);
        });
        console.log(
            // eslint-disable-line no-console
            `Your component is shining at ${path.resolve(
                'src',
                'client',
                'modules',
                moduleName,
                componentName,
                `${componentName}.tsx`
            )}`
        );
    } catch (error) {
        console.error(error);
    }
}

/**
 * @param {string} moduleName
 * @param {string} componentName
 * @param {string} filename
 * @param {Enhancers[]} currentEnhancers
 */
async function processFile(moduleName, componentName, filename, currentEnhancers) {
    const filePath = path.resolve('src', 'client', 'modules', moduleName, 'components', componentName, filename);
    fs.closeSync(fs.openSync(filePath, 'a'));
    fs.writeFileSync(
        filePath,
        await getModifiedContent(
            getContent(moduleName, componentName, filename),
            {
                componentName,
                enhancerList: getEnhancerList(filename, currentEnhancers),
                enhancerType: getEnhancerType(componentName, filename, currentEnhancers),
                importedType: getImportedType(componentName, filename, currentEnhancers),
                exportedEntity: getExportedEntity(componentName, filename, currentEnhancers),
                outerPropsInterfaceList: getOuterPropsInterfaceList(componentName, filename, currentEnhancers),
            },
            filePath
        )
    );
}

/**
 * @param {string} componentName
 * @param {string} filename
 * @param {Enhancers[]} currentEnhancers
 * @return {string[]|null}
 */
function getOuterPropsInterfaceList(componentName, filename, currentEnhancers) {
    switch (filename) {
        case `${componentName}.tsx`:
            return [
                getExternalInterface(),
                ...currentEnhancers.map(getShortInterfaceByEnhancer).filter(value => value),
                'CurrentStyledComponentsInnerProps',
            ];
        case `${componentName}${Enhancers.STORE}.ts`:
            return [getExternalInterface()];
        case `${componentName}${Enhancers.APOLLO}.ts`:
            return [
                getExternalInterface(),
                `Partial<${getShortInterfaceByEnhancer(Enhancers.APOLLO)}>`,
                currentEnhancers.includes(Enhancers.STORE) ? getShortInterfaceByEnhancer(Enhancers.STORE) : null,
            ].filter(value => value);
        case `${componentName}${Enhancers.BEHAVIOUR}.ts`:
            return [
                getExternalInterface(),
                currentEnhancers.includes(Enhancers.STORE) ? getShortInterfaceByEnhancer(Enhancers.STORE) : null,
                currentEnhancers.includes(Enhancers.APOLLO) ? getShortInterfaceByEnhancer(Enhancers.APOLLO) : null,
            ].filter(value => value);
        case 'index.ts':
        case `${componentName}Type.ts`:
        case `${componentName}${Enhancers.THEME}.ts`:
        case `${componentName}${Enhancers.UPDATE_CONDITION}.ts`:
            return null;
        default:
            throw new Error('Unrecognized file');
    }
}

/**
 * @param {string} componentName
 * @param {string} filename
 * @param {Enhancers[]} currentEnhancers
 * @return {{
 *     includeList: string[],
 *     excludeList: string[]
 * }|null}
 */
function getExportedEntity(componentName, filename, currentEnhancers) {
    const entity = `ThemeType as ${componentName}ThemeType`;
    let includeList = [];
    let excludeList = [];

    if (filename === 'index.ts') {
        if (currentEnhancers.includes(Enhancers.THEME)) {
            includeList = [entity];
        } else {
            excludeList = [entity];
        }

        return {
            includeList,
            excludeList,
        };
    }

    return null;
}

/**
 * @param {string} componentName
 * @param {string} filename
 * @param {Enhancers[]} currentEnhancers
 * @return {{includeList: string[], excludeList: string[]}}
 */
function getImportedType(componentName, filename, currentEnhancers) {
    const missingEnhancers = getMissingEnhancers(currentEnhancers);
    const excludeList = flatten(
        missingEnhancers.map(enhancer =>
            [
                getShortInterfaceByEnhancer(enhancer),
                ...getInterfaceListByEnhancer(enhancer),
                ...getEnumListByEnhancer(enhancer),
            ].filter(value => value)
        )
    );

    let includeList = [];

    switch (filename) {
        case 'index.ts':
            includeList = [
                ...(currentEnhancers.includes(Enhancers.THEME) ? getEnumListByEnhancer(Enhancers.THEME) : []),
            ];
            break;
        case `${componentName}.tsx`:
            includeList = [
                currentEnhancers.includes(Enhancers.STORE) ? getShortInterfaceByEnhancer(Enhancers.STORE) : null,
                currentEnhancers.includes(Enhancers.APOLLO) ? getShortInterfaceByEnhancer(Enhancers.APOLLO) : null,
                currentEnhancers.includes(Enhancers.BEHAVIOUR)
                    ? getShortInterfaceByEnhancer(Enhancers.BEHAVIOUR)
                    : null,
            ].filter(value => value);
            break;
        case `${componentName}${Enhancers.APOLLO}.ts`:
            includeList = [
                currentEnhancers.includes(Enhancers.STORE) ? getShortInterfaceByEnhancer(Enhancers.STORE) : null,
            ].filter(value => value);
            break;
        case `${componentName}${Enhancers.BEHAVIOUR}.ts`:
            includeList = [
                currentEnhancers.includes(Enhancers.STORE) ? getShortInterfaceByEnhancer(Enhancers.STORE) : null,
                currentEnhancers.includes(Enhancers.APOLLO) ? getShortInterfaceByEnhancer(Enhancers.APOLLO) : null,
            ].filter(value => value);
            break;
        case `${componentName}Type.ts`:
        case `${componentName}${Enhancers.STORE}.ts`:
        case `${componentName}${Enhancers.THEME}.ts`:
        case `${componentName}${Enhancers.UPDATE_CONDITION}.ts`:
            includeList = [];
            break;
        default:
            throw new Error(`Unrecognized file: ${filename}`);
    }

    return {
        includeList,
        excludeList,
    };
}

/**
 * @param {Enhancers[]} enhancerList
 * @return {string[]}
 */
function getMissingEnhancers(enhancerList) {
    return Object.values(Enhancers).filter(enhancer => !enhancerList.includes(enhancer));
}

/**
 * @param {string} componentName
 * @param {string} filename
 * @param {Enhancers[]} currentEnhancers
 * @return {{
 *     enumList: string[],
 *     interfaceList: string[],
 *     typeList: {
 *         name: string,
 *         value: VariadicString
 *     }[]
 * }|null}
 */
function getEnhancerType(componentName, filename, currentEnhancers) {
    if (filename === `${componentName}Type.ts`) {
        return {
            enumList: flatten(currentEnhancers.map(getEnumListByEnhancer)),
            interfaceList: flatten(currentEnhancers.map(getInterfaceListByEnhancer)),
            typeList: getTypeList(currentEnhancers),
        };
    } else {
        return null;
    }
}

/**
 * @typedef {
 *     string|string[]
 * } VariadicString
 */

/**
 * @param {Enhancers[]} enhancerList
 * @return {{
 *     name: string,
 *     value: VariadicString
 * }[]}
 */
function getTypeList(enhancerList) {
    return [
        enhancerList.includes(Enhancers.STORE)
            ? {
                  name: getShortInterfaceByEnhancer(Enhancers.STORE),
                  value: [
                      ...getInterfaceListByEnhancer(Enhancers.STORE),
                      '{ dispatch?<A extends {type: string}>(action: A): A }',
                  ],
              }
            : null,
        enhancerList.includes(Enhancers.BEHAVIOUR)
            ? {
                  name: getShortInterfaceByEnhancer(Enhancers.BEHAVIOUR),
                  value: getInterfaceListByEnhancer(Enhancers.BEHAVIOUR),
              }
            : null,
        {
            name: 'CurrentStyledComponentsOuterProps',
            value: `StyledComponentsOuterProps${enhancerList.includes(Enhancers.THEME) ? '<ThemeType>' : ''}`,
        },
        {
            name: 'CurrentStyledComponentsInnerProps',
            value: `StyledComponentsInnerProps${enhancerList.includes(Enhancers.THEME) ? '<Theme>' : ''}`,
        },
    ].filter(value => value);
}

/**
 * @return {string}
 */
function getExternalInterface() {
    return 'PropsExternal';
}

/**
 * @param {Enhancers} enhancer
 * @return {string[]}
 */
function getInterfaceListByEnhancer(enhancer) {
    switch (enhancer) {
        case Enhancers.STORE:
            return ['Store', 'StoreUpdaters'];
        case Enhancers.APOLLO:
            return ['PropsApollo'];
        case Enhancers.BEHAVIOUR:
            return ['State', 'StateUpdaters', 'Handlers'];
        case Enhancers.THEME:
            return ['Theme'];
        case Enhancers.UPDATE_CONDITION:
            return [];
        default:
            throw new Error('Unrecognized enhancer');
    }
}

/**
 * @return {string[]}
 */
function getInterfaceListInCanonicalOrder() {
    return [
        ...getInterfaceListByEnhancer(Enhancers.STORE),
        ...getInterfaceListByEnhancer(Enhancers.APOLLO),
        ...getInterfaceListByEnhancer(Enhancers.BEHAVIOUR),
        ...getInterfaceListByEnhancer(Enhancers.THEME),
        ...getInterfaceListByEnhancer(Enhancers.UPDATE_CONDITION),
    ];
}

/**
 * @param {Enhancers} enhancer
 * @return {string}
 */
function getShortInterfaceByEnhancer(enhancer) {
    switch (enhancer) {
        case Enhancers.STORE:
            return 'PropsStore';
        case Enhancers.APOLLO:
            return 'PropsApollo';
        case Enhancers.BEHAVIOUR:
            return 'PropsBehaviour';
        case Enhancers.THEME:
            return null;
        case Enhancers.UPDATE_CONDITION:
            return null;
        default:
            throw new Error('Unrecognized enhancer');
    }
}

/**
 * @param {Enhancers} enhancer
 * @return {string[]}
 */
function getEnumListByEnhancer(enhancer) {
    if (enhancer === Enhancers.THEME) {
        return ['ThemeType'];
    } else {
        return [];
    }
}

/**
 * @param {string} filename
 * @param {Enhancers[]} currentEnhancers
 * @return {null}
 */
function getEnhancerList(filename, currentEnhancers) {
    return filename === 'index.ts' ? currentEnhancers : null;
}

/**
 * @typedef {{
 *    componentName: string,
 *    enhancerList: string[] | null,
 *    enhancerType: {
 *        enumList: string[],
 *        interfaceList: string[],
 *        typeList: {
 *            name: string,
 *            value: string | string[]
 *        }[]
 *    } | null,
 *    importedType: {
 *        includeList: string[],
 *        excludeList: string[]
 *    },
 *    exportedEntity: {
 *        includeList: string[],
 *        excludeList: string[]
 *    } | null,
 *    outerPropsInterfaceList: string[] | null,
 * }} Config
 */

/**
 * @param {string} content
 * @param {Config} config
 * @param {string} filePath
 * @return {Promise<string>}
 */
async function getModifiedContent(content, config, filePath) {
    return prettify(
        compose(
            modifyEnhancerList(config),
            modifyImportedType(config),
            modifyEnhancerType(config),
            modifyExportedEntity(config),
            modifyOuterPropsInterfaceList(config)
        )(content),
        filePath
    );
}

/**
 * @param {string} content
 * @param {string} filePath
 * @return {Promise<string>}
 */
async function prettify(content, filePath) {
    const config = await prettier.resolveConfig(filePath);
    return prettier.format(content, { ...config, parser: 'typescript' });
}

/**
 * @param {Config} config
 * @return {function(content: string): string}
 */
function modifyEnhancerList(config) {
    return content => {
        if (config.enhancerList) {
            Object.values(Enhancers).forEach(enhancer => {
                const importRegExp = new RegExp(
                    `[\\r\\n]?import +{ *${config.componentName}${enhancer} *}.+[\\r\\n]`,
                    'g'
                );
                content = content.replace(importRegExp, '\n');
            });

            const newImports = config.enhancerList
                .map(
                    enhancer =>
                        `import { ${config.componentName}${enhancer} } from './${config.componentName}${enhancer}';\n`
                )
                .join('');
            const endOfImportsRegExp = /import .+[\r\n](?!import)/g;
            endOfImportsRegExp.exec(content);
            const index = endOfImportsRegExp.lastIndex;
            content = [content.slice(0, index), newImports, content.slice(index)].join('');

            const composeRegExp = new RegExp(
                `const +Enhanced${config.componentName} += +compose(?:.|[\\r\\n])+?\\([\r\n]? *${
                    config.componentName
                },?[\r\n]?\\);?`,
                'g'
            );
            const newCompose = `const Enhanced${config.componentName} = compose<{}, PropsExternal>(
${config.enhancerList.map(enhancer => `    ${config.componentName}${enhancer},`).join('\n')}
)(${config.componentName});`;
            content = content.replace(composeRegExp, newCompose);
        }
        return content;
    };
}

/**
 * @param {Config} config
 * @return {function(content: string): string}
 */
function modifyImportedType(config) {
    return content => {
        if (config.importedType) {
            const importTypeRegExp = new RegExp(
                `import +{((?:[^}]|[\\r\\n])+?)} +from +'\\./${config.componentName}Type';?`
            );
            const importMatch = content.match(importTypeRegExp);
            if (importMatch) {
                const oldImport = importMatch[0];
                const importedItemsString = importMatch[1];
                let importedItems = importedItemsString
                    .split(/,[ \r\n]*/)
                    .map(item => item.trim())
                    .filter(value => value);
                importedItems = importedItems.filter(item => !config.importedType.excludeList.includes(item));
                importedItems = [...new Set(importedItems.concat(config.importedType.includeList))];
                const newImport = `import {${importedItems.join(', ')}} from './${config.componentName}Type';`;
                content = content.replace(oldImport, newImport);
            }
        }
        return content;
    };
}

/**
 * @param {Config} config
 * @return {function(content: string): string}
 */
function modifyEnhancerType(config) {
    return content => {
        if (config.enhancerType) {
            const enhancerTypesPartRegExp = /export interface PropsExternal(?:.|[\r\n])+?}([\r\n](?:.|[\r\n])*?export type CurrentStyledComponentsInnerProps.+[\r\n])/g;
            const interfaceRegExp = /(?:\/\*\*?(?:(?:.|[\r\n])(?!\*?\*\/))+?(?:.|[\r\n])\*?\*\/[\r\n])?export +interface +(.+) +{(?:.|[\r\n])*?}/g;
            const enumRegExp = /(?:\/\*\*?(?:(?:.|[\r\n])(?!\*?\*\/))+?(?:.|[\r\n])\*?\*\/[\r\n])?export +(?:const +)?enum +(.+) +{(?:.|[\r\n])*?}/g;
            const enhancerTypesPart = enhancerTypesPartRegExp.exec(content)[1];
            let resultInterfaces = {};
            let resultEnums = {};
            let resultTypes = {};

            let match;
            while ((match = interfaceRegExp.exec(enhancerTypesPart))) {
                resultInterfaces[match[1]] = match[0];
            }
            while ((match = enumRegExp.exec(enhancerTypesPart))) {
                resultEnums[match[1]] = match[0];
            }

            resultInterfaces = pickBy(resultInterfaces, (_, key) => config.enhancerType.interfaceList.includes(key));
            resultEnums = pickBy(resultEnums, (_, key) => config.enhancerType.enumList.includes(key));

            config.enhancerType.interfaceList
                .filter(item => !Object.keys(resultInterfaces).includes(item))
                .forEach(interfaceName => {
                    resultInterfaces[interfaceName] = `${getEnhancerTypeCommentary(
                        interfaceName
                    )}\nexport interface ${interfaceName} {}`;
                });

            resultInterfaces = getInterfaceListInCanonicalOrder()
                .map(interfaceName => resultInterfaces[interfaceName])
                .filter(value => value);

            config.enhancerType.enumList.filter(item => !Object.keys(resultEnums).includes(item)).forEach(enumName => {
                resultEnums[enumName] = `${getEnhancerTypeCommentary(
                    enumName
                )}\nexport enum ${enumName} {DEFAULT = 'default'}`;
            });

            config.enhancerType.typeList.forEach(typeItem => {
                let arrayValue = typeItem.value;
                if (typeof typeItem.value === 'string') {
                    arrayValue = [typeItem.value];
                }
                resultTypes[typeItem.name] = `export type ${typeItem.name} = ${arrayValue.join(' & ')}`;
            });

            content = content.replace(
                enhancerTypesPart,
                (
                    '\n\n' +
                    Object.values(resultInterfaces).join('\n\n') +
                    '\n\n' +
                    Object.values(resultEnums).join('\n\n') +
                    '\n\n' +
                    Object.values(resultTypes).join('\n') +
                    '\n'
                ).replace(/\n\n+/g, '\n\n')
            );
        }
        return content;
    };
}

/**
 * @param {Config} config
 * @return {function(content: string): string}
 */
function modifyExportedEntity(config) {
    return content => {
        if (config.exportedEntity) {
            const exportRegExp = new RegExp(`export +{((?:[^}]|[\\r\\n])+?)};?`);
            const exportMatch = content.match(exportRegExp);
            if (exportMatch) {
                const oldExport = exportMatch[0];
                const exportedItemsString = exportMatch[1];
                let exportedItems = exportedItemsString
                    .split(/,[ \r\n]*/)
                    .map(item => item.trim())
                    .filter(value => value);
                exportedItems = exportedItems.filter(item => !config.exportedEntity.excludeList.includes(item));
                exportedItems = [...new Set(exportedItems.concat(config.exportedEntity.includeList))];
                const newExport = `export {${exportedItems.join(', ')}};`;
                content = content.replace(oldExport, newExport);
            }
        }
        return content;
    };
}

/**
 * @param {Config} config
 * @return {function(content: string): string}
 */
function modifyOuterPropsInterfaceList(config) {
    return content => {
        if (config.outerPropsInterfaceList) {
            const outerPropsRegExp = /type +OuterProps *= *(?:Omit<)?((?:.|[\r\n])+?)[,;\r\n]/;
            const outerPropsMatch = content.match(outerPropsRegExp);
            if (outerPropsMatch) {
                const oldOuterProps = outerPropsMatch[0];
                const oldInterfaces = outerPropsMatch[1];
                const newInterfaces = config.outerPropsInterfaceList.join(' & ');
                const newOuterProps = oldOuterProps.replace(oldInterfaces, newInterfaces);
                content = content.replace(oldOuterProps, newOuterProps);
            }
        }
        return content;
    };
}

/**
 * @param {string} moduleName
 * @param {string} componentName
 * @param {string} filename
 * @return {string}
 */
function getContent(moduleName, componentName, filename) {
    const filePath = path.resolve('src', 'client', 'modules', moduleName, 'components', componentName, filename);
    return (
        (fs.existsSync(filePath) && fs.readFileSync(filePath, { encoding: 'utf-8' })) ||
        getTemplateByFilename(componentName, filename)
    );
}

/**
 * @param {string} moduleName
 * @param {string} componentName
 * @param {Enhancers[]} addingEnhancers
 * @return {Enhancers[]}
 */
function addEnhancersFromFileSystem(moduleName, componentName, addingEnhancers) {
    const rootPath = path.resolve('src', 'client', 'modules', moduleName, 'components', componentName);
    const files = fs.readdirSync(rootPath);
    const resultEnhancers = [...addingEnhancers];

    files.forEach(filename => {
        Object.values(Enhancers).forEach(value => {
            if (`${componentName}${value}.ts` === filename && addingEnhancers.indexOf(value) === -1) {
                resultEnhancers.push(value);
            }
        });
    });

    return resultEnhancers;
}

/**
 * @param {Enhancers[]} enhancerList
 * @return {Enhancers[]}
 */
function reorderEnhancers(enhancerList) {
    return Object.values(Enhancers).filter(enhancer => enhancerList.includes(enhancer));
}

/**
 * @param {string} moduleName
 * @param {string} componentName
 * @param {Enhancers[]} addEnhancers
 * @return {string[]}
 */
function getAffectedFilesList(moduleName, componentName, addEnhancers) {
    const rootPath = path.resolve('src', 'client', 'modules', moduleName, 'components', componentName);
    const files = fs.readdirSync(rootPath);

    return [
        ...new Set(
            files
                .filter(filename =>
                    Object.values(Enhancers).includes((RegExp(`${componentName}(.+).ts`).exec(filename) || [])[1])
                )
                .concat(addEnhancers.map(enhancer => `${componentName}${enhancer}.ts`))
                .concat(['index.ts', `${componentName}.tsx`, `${componentName}Type.ts`])
        ),
    ];
}

/**
 * @param {string} moduleName
 * @param {string} componentName
 * @param {Enhancers[]} removeEnhancers
 */
function removeFiles(moduleName, componentName, removeEnhancers = []) {
    const rootPath = path.resolve('src', 'client', 'modules', moduleName, 'components', componentName);
    removeEnhancers.forEach(enhancer => {
        const filePath = path.resolve(rootPath, `${componentName}${enhancer}.ts`);
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    });
}

/**
 * @param {Arguments} program
 */
function checkArgumentsSanity(program) {
    const enhancersIntersection = intersection(program.addEnhancers, program.removeEnhancers);
    if (!isEmpty(enhancersIntersection)) {
        throw new Error(`Not sure what to do with: ${enhancersIntersection}`);
    }
}

/**
 * @param {string} moduleName
 * @param {string} componentName
 */
async function prepareDirectory(moduleName, componentName) {
    const modulePath = path.resolve('src', 'client', 'modules', moduleName, 'components');
    const isModuleExist = fs.existsSync(modulePath);

    if (isModuleExist || (await shouldCreateNewModuleAsync(moduleName))) {
        const root = path.resolve(modulePath, componentName);

        if (!fs.existsSync(root)) {
            mkdirp.sync(root);
        }
    } else {
        throw new Error('No directory was created');
    }
}

/**
 * @param {string} modulePath
 * @return {Promise<boolean>}
 */
function shouldCreateNewModuleAsync(modulePath) {
    return new Promise(function(resolve) {
        prompt.start();
        prompt.message = '';
        prompt.delimeter = '';
        prompt.get(
            {
                properties: {
                    answer: {
                        pattern: /^[YyNn]$/,
                        description: `Module "${moduleName}" doesn't exist! Do you want to create it? [y/n] `,
                        required: true,
                        message: 'Do you want it (Y/y) or not (N/n)?',
                    },
                },
            },
            (_, result) => {
                if (result.answer.toLowerCase() === 'y') {
                    resolve(true);
                } else {
                    resolve(false);
                }
            }
        );
    });
}

/**
 * @param {string} moduleName
 * @return {string}
 */
function validateModuleName(moduleName) {
    return moduleName.toLowerCase();
}

/**
 * @param {string} componentName
 * @return {string}
 */
function validateComponentName(componentName) {
    const [firstLetter, ...tail] = componentName;
    const validComponentName = `${firstLetter.toUpperCase()}${tail.join('')}`;
    if (validComponentName === 'App') {
        throw new Error('App component is specific. Edit it manually');
    }
    return validComponentName;
}

/**
 * @param {string} value - comma separated values as one string
 * @return {Array<string>}
 */
function getListOfEnhancersFromArgs(value) {
    return (
        value
            .split(/, */g)
            .map(name => {
                const type = Object.keys(Enhancers).find(type => {
                    const enhancerName = Enhancers[type].toLowerCase();
                    const passedName = name.toLowerCase();
                    return (
                        enhancerName === passedName || (passedName.length === 1 && enhancerName[0] === passedName[0])
                    );
                });
                if (Enhancers[type]) {
                    return Enhancers[type];
                } else {
                    throw new Error(`Unknown enhancer: ${name}`);
                }
            })
            .filter(value => value) || []
    );
}

/**
 * @param {Object<string>} object
 * @return {string}
 */
function objectIntoCommaSeparatedLoweredValues(object) {
    return Object.values(object)
        .map(value => value.toLowerCase())
        .join(',');
}

/**
 * @param {Object<string>} object
 * @return {string}
 */
function objectIntoCommaSeparatedValueFirstLetters(object) {
    return Object.values(object)
        .map(value => value[0].toLowerCase())
        .join(',');
}

/**
 * @param {string} enhancerTypeName
 * @return {string}
 */
function getEnhancerTypeCommentary(enhancerTypeName) {
    switch (enhancerTypeName) {
        case 'Store':
            return '/** Redux Store Props */';
        case 'StoreUpdaters':
            return '/** Redux Store Updaters (binded action creators). Must return void. */';
        case 'PropsApollo':
            return (
                '/** Apollo Props. Queries and mutations.\n' +
                ' *  Mutations must have the following type. Type of args is up to you (i.e. you may pass the whole entity for optimistic\n' +
                ' *  response). Mutate and MutationResult are from common/lib/apollo/types. Remember that you have access to mutation\n' +
                ' *  state on function itself (i.e. mutateMyStuff.loading). Also remember to compose your mutation with withStateMutation\n' +
                ' *  and map it to function with desired args. You should also rename fields of MutateMyStuffMutation from verbs to nouns\n' +
                ' *  (in your *Graphql.graphql).\n' +
                ' *      mutateMyStuff: Mutate<(args: MutateMyStuffMutationVariables) => MutationResult<MutateMyStuffMutation>>;\n' +
                ' *  Queries should have the following type. Data is from common/lib/apollo/types.\n' +
                ' *      myStuff: Data<MyStuffQuery, MyStuffQueryVariables>;\n' +
                ' *  Depending on your needs, you may also split myStuff into separate parts (like myStuffPart, myStuffLoading,\n' +
                ' *  myStuffError, myStuffRefetch and so on). In that case correct type definitions are up to you.\n' +
                ' */'
            );
        case 'State':
            return '/** Local Component State Props */';
        case 'StateUpdaters':
            return "/** Local Component State Updaters. Must return void. Are called asynchronously and can't contain asynchronous code */";

        case 'Handlers':
            return '/** Handlers. Must return void. Are called synchronously and can contain asynchronous code */';
        case 'ThemeType':
            return '/** Outer themeType is transformed into inner theme */';
        case 'Theme':
            return '/** Theme object inside stateless component and each styled-component */';
        default:
            return '';
    }
}

/**
 * @param {string} componentName
 * @param {string} filename
 * @return {string}
 */
function getTemplateByFilename(componentName, filename) {
    switch (filename) {
        case 'index.ts':
            return indexTemplate(componentName);
        case `${componentName}.tsx`:
            return tsxTemplate(componentName);
        case `${componentName}Type.ts`:
            return typeTemplate(componentName);
        case `${componentName}${Enhancers.STORE}.ts`:
            return storeTemplate(componentName);
        case `${componentName}${Enhancers.APOLLO}.ts`:
            return apolloTemplate(componentName);
        case `${componentName}${Enhancers.BEHAVIOUR}.ts`:
            return behaviourTemplate(componentName);
        case `${componentName}${Enhancers.THEME}.ts`:
            return themeTemplate(componentName);
        case `${componentName}${Enhancers.UPDATE_CONDITION}.ts`:
            return withUpdateConditionTemplate(componentName);
    }
}

/**
 * @param {string} componentName
 * @return {string}
 */
function indexTemplate(componentName) {
    return `import { compose } from 'recompose';
import { ${componentName} } from './${componentName}';
import {PropsExternal} from './${componentName}Type';

const Enhanced${componentName} = compose<{}, PropsExternal>()(${componentName});

export {Enhanced${componentName} as ${componentName}, PropsExternal as ${componentName}Props};
`;
}

/**
 * @param {string} componentName
 * @return {string}
 */
function tsxTemplate(componentName) {
    return `import * as React from 'react';
import styled from 'styled-components';
import { CurrentStyledComponentsInnerProps, PropsExternal } from './${componentName}Type';

const ${componentName}: React.StatelessComponent<OuterProps> = ({ className }) => <Root className={className}>
    ${componentName}
</Root>;

const Root = styled.div\`
    /* internal styles here */
\`;

type OuterProps = Omit<PropsExternal & CurrentStyledComponentsInnerProps, 'themeType'>;

export { ${componentName} };
`;
}

/**
 * @param {string} componentName
 * @return {string}
 */
function typeTemplate(componentName) {
    return `import { StyledComponentsOuterProps, StyledComponentsInnerProps } from '../../../common/lib/BaseProps';

/** Props passed from outside. The only predefined interface that can extend anything */
export interface PropsExternal extends CurrentStyledComponentsOuterProps {}

export type CurrentStyledComponentsOuterProps = StyledComponentsOuterProps
export type CurrentStyledComponentsInnerProps = StyledComponentsInnerProps

/** Define interfaces for inner components props here. They must extend CurrentStyledComponentsInnerProps
 *  I.e. interface RootProps extends CurrentStyledComponentsInnerProps {rootSpecificValue: string};
 */

/** Define your own types and interfaces here.
 *  I.e. type Point = {x: number; y: number};
 */
`;
}

/**
 * @param {string} componentName
 * @return {string}
 */
function storeTemplate(componentName) {
    return `import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { State } from '../../../../IsomorphicStore';
import { Store, StoreUpdaters, PropsExternal } from './${componentName}Type';

const ${componentName}Store = connect<Store, StoreUpdaters, OuterProps, State>(
    mapStateToProps,
    mapDispatchToProps,
);

function mapStateToProps(state: State, ownProps: OuterProps): Store {
    return {};
}

function mapDispatchToProps(dispatch: Dispatch, ownProps: OuterProps): StoreUpdaters {
    return bindActionCreators({}, dispatch);
}

type OuterProps = PropsExternal;

export { ${componentName}Store };
`;
}

/**
 * @param {string} componentName
 * @return {string}
 */
function apolloTemplate(componentName) {
    return `import { compose } from 'recompose';
import { PropsApollo, PropsExternal } from './${componentName}Type';

/** Mutations tend to be the most difficult thing, so here is an example. Please remove it once you got the idea.
 * 
 * const ApolloMutateMyStuff = compose(
 *     graphql<OuterProps, MutateMyStuffMutation, MutateMyStuffMutationVariables, Partial<PropsApollo>>(
 *         MutateMyStuff,
 *         {
 *             props: ({ mutate }) => ({
 *                 mutateMyStuff: ({myVariable}) => mutate!({ variables: { myVariable } }),
 *             }),
 *         },
 *     ),
 *     withStateMutation({ mutationName: 'mutateMyStuff' }),
 * );
 */

const ${componentName}Apollo = compose<OuterProps & PropsApollo, OuterProps>();

type OuterProps = PropsExternal;

export { ${componentName}Apollo };
`;
}

/**
 * @param {string} componentName
 * @return {string}
 */
function behaviourTemplate(componentName) {
    return `import { withBehaviour } from '../../../common/lib/withBehaviour';
import { PropsExternal, State, StateUpdaters, Handlers } from './${componentName}Type';

const ${componentName}Behaviour = withBehaviour<State, StateUpdaters, Handlers, OuterProps>(
    {},
    /** State updaters are called asynchronously and must not contain asynchronous code */
    {},
    () => {
        /** Data that is not displaying in GUI, but is shareable between handlers (i.e. refs and timer ids) */

        /** Handlers are called synchronously and may contain asynchronous code */
        return {};
    },
    {},
);

type OuterProps = PropsExternal;

export { ${componentName}Behaviour };
`;
}

/**
 * @param {string} componentName
 * @return {string}
 */
function themeTemplate(componentName) {
    return `import { Dictionary } from 'lodash';
import { withTheme } from '../../../common/lib/withTheme';
import { ThemeType, Theme } from './${componentName}Type';

const baseTheme: Theme = {};

const themeDict: Dictionary<Theme> = {
    [ThemeType.DEFAULT]: {
        ...baseTheme,
    },
};

const ${componentName}Theme = withTheme(themeDict);

export { ${componentName}Theme };
`;
}

/**
 * @param {string} componentName
 * @return {string}
 */
function withUpdateConditionTemplate(componentName) {
    return `import PropTypes from 'prop-types';
import { compose, onlyUpdateForPropTypes, setPropTypes } from 'recompose';

/** propTypes are used for optimizing stateless component updates only, and must include only props that it takes */
export const propTypes = {
    className: PropTypes.string,
};

/** HOC onlyUpdateForPropTypes should be fine for most cases.
 *  In weird situations use other HOCs: onlyUpdateForKeys, shouldUpdate or pure.
 */
const ${componentName}UpdateCondition = compose(onlyUpdateForPropTypes, setPropTypes(propTypes));

export { ${componentName}UpdateCondition };
`;
}
