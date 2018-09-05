const path = require('path');
const lodash = require('lodash');
const configBuilderLib = require('./configBuilder');

/**
 * @enum {string}
 */
const CONFIG_NAME = {
    ROOT: 'root',
    API: 'api',
};

/**
 * @enum {string}
 */
const ENV = {
    DEV: 'dev',
    PROD: 'prod',
    QA: 'qa',
};

const configBuilder = new configBuilderLib.ConfigBuilder(path.join(__dirname, '../config'));
const CURRENT_ENV = process.env.REACT_BOILERPLATE_ENV || ENV.DEV;
if (!process.env.REACT_BOILERPLATE_ENV) {
    console.warn(`[WARN] process.env.REACT_BOILERPLATE_ENV is not defined. Falling back to '${CURRENT_ENV}'`);
}
configBuilder.setEnviroment(CURRENT_ENV);

/**
 *
 * @param {CONFIG_NAME|string} configName
 * @param {ENV|string} customEnv
 * @return {any}
 */
function getConfig(configName, customEnv) {
    return configBuilder.getConfig(validateConfigName(configName), validateEnvironment(customEnv));
}

/**
 * @param {?ENV|string} customEnv
 * @return {any}
 */
function getCompleteConfig(customEnv) {
    const validEnv = validateEnvironment(customEnv);
    return lodash
        .values(CONFIG_NAME)
        .map(configName => ({ [configName]: getConfig(configName, validEnv) }))
        .reduce((prev, next) => Object.assign(prev, next));
}

/**
 * @param {?ENV|string} environment
 * @return {?ENV}
 */
function validateEnvironment(environment) {
    let validEnvironment = environment;

    const environmentList = lodash.values(ENV);

    if (validEnvironment && environmentList.indexOf(validEnvironment) === -1) {
        console.warn(`[WARN] Invalid environment '${validEnvironment}', assuming it's '${ENV.DEV}'`);
        validEnvironment = ENV.DEV;
    }

    return validEnvironment;
}

/**
 * @param {CONFIG_NAME|string} configName
 * @return {CONFIG_NAME}
 */
function validateConfigName(configName) {
    let validConfigName = configName;

    const configNameList = lodash.values(CONFIG_NAME);

    if (configNameList.indexOf(validConfigName) === -1) {
        console.warn(`[WARN] Invalid config name '${validConfigName}', assuming it's '${CONFIG_NAME.FRONTIK}'`);
        validConfigName = CONFIG_NAME.FRONTIK;
    }

    return validConfigName;
}

module.exports = {
    getConfig,
    getCompleteConfig,
    ENV,
    CONFIG_NAME,
};
