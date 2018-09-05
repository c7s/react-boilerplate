'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const fs = require('fs');
const path = require('path');
const ConfigFile_1 = require('./ConfigFile');
const Helper_1 = require('./Helper');
function removeFromNodeCache(id) {
    delete require.cache[require.resolve(id)];
}
class ConfigBuilder {
    constructor(configPath, params) {
        this.cachedConfigs = [];
        this.ENV_ERROR_STRING =
            'You must set enviroment with "setEnviroment" ' + 'or pass it directly to executed method argument';
        params = params || {};
        if (!Helper_1.Helper.isDirectory(configPath)) {
            throw new Error(`Path ${configPath} is not a valid directory`);
        }
        this.configPath = configPath;
        const dest = params.destPath || configPath;
        if (!Helper_1.Helper.isDirectory(dest)) {
            fs.mkdirSync(dest);
        }
        this.destinationPath = dest;
        this.isUsingFracturedConfigs = params.isUsingFracturedConfigs || false;
        this.loadBaseConfigs();
    }
    setEnviroment(env) {
        this.env = env;
    }
    build(passedEnv) {
        const env = passedEnv ? passedEnv : this.env;
        console.warn(`Method "build" in ConfigBuilder is deprecated!`);
        console.warn(`Use "getConfig" to get config dynamically!`);
        if (!env) {
            throw new Error(this.ENV_ERROR_STRING);
        }
        console.log('[DEBUG] ENV: ' + env);
        this.baseConfigs.forEach(config => {
            this.createLocalConfig(config, env);
        });
    }
    getConfig(name, passedEnv) {
        const env = passedEnv ? passedEnv : this.env;
        if (!env) {
            throw new Error(this.ENV_ERROR_STRING);
        }
        const baseConfig = this.baseConfigs.find(config => config.name == name);
        if (!baseConfig) {
            throw new Error(`Cant find base config with name ${name}`);
        }
        const cachedConfig = this.cachedConfigs.find(cached => cached.name == name && cached.env == env);
        return cachedConfig ? cachedConfig.content : this.generateConfig(baseConfig, env);
    }
    printConfigs(passedEnv) {
        const env = passedEnv ? passedEnv : this.env;
        if (!env) {
            throw new Error(this.ENV_ERROR_STRING);
        }
        this.baseConfigs.forEach(configFile => {
            console.log(`===== ${configFile.name} =====`);
            const config = this.getConfig(configFile.name, env);
            console.log(JSON.stringify(config, null, 4));
        });
    }
    reload() {
        try {
            this.loadBaseConfigs();
            this.cachedConfigs.forEach(cachedConfig => {
                const baseConfig = this.baseConfigs.find(config => {
                    return config.name === cachedConfig.name;
                });
                if (baseConfig) {
                    let result;
                    removeFromNodeCache(baseConfig.path);
                    result = Object.assign({}, baseConfig.getContent());
                    const envConfig = this.getSpecificConfig(baseConfig.name, cachedConfig.env);
                    if (envConfig) {
                        removeFromNodeCache(envConfig.path);
                        result = Object.assign(result, envConfig.getContent());
                    }
                    const localConfig = this.getSpecificConfig(baseConfig.name, 'local', {
                        suppressWarnings: true,
                    });
                    if (localConfig) {
                        removeFromNodeCache(localConfig.path);
                        result = Object.assign(result, localConfig.getContent());
                    }
                    Object.assign(cachedConfig.content, result);
                }
            });
        } catch (err) {
            console.warn(err);
        }
    }
    generateConfig(baseConfig, env) {
        let result = baseConfig.getContent();
        const envConfig = this.getSpecificConfig(baseConfig.name, env);
        if (envConfig) {
            const envContent = envConfig.getContent();
            result = Object.assign({}, result, envContent);
        }
        const localConfig = this.getSpecificConfig(baseConfig.name, 'local', {
            suppressWarnings: true,
        });
        if (localConfig) {
            const localContent = localConfig.getContent();
            result = Object.assign(result, localContent);
        }
        this.cachedConfigs.push({
            name: baseConfig.name,
            env: env,
            content: result,
        });
        return result;
    }
    loadBaseConfigs() {
        const directory = path.join(this.configPath, 'base');
        this.baseConfigs = this.getConfigsInDirectory(directory);
    }
    getConfigsInDirectory(directory, options) {
        let results = [];
        if (Helper_1.Helper.isDirectory(directory)) {
            const paths = this.isUsingFracturedConfigs
                ? Helper_1.Helper.getConfigAllPathList(directory)
                : Helper_1.Helper.getConfigFilePathList(directory);
            results = paths.map(path => new ConfigFile_1.ConfigFile(path));
        } else if (!options || !options.suppressWarnings) {
            console.warn(`[WARN] Cant find directory ${directory}`);
        }
        return results;
    }
    /**
     * @deprecated
     */
    createLocalConfig(baseConfig, env) {
        const name = baseConfig.name;
        const config = this.generateConfig(baseConfig, env);
        const existingConfig = this.getSpecificConfig(name, '.');
        if (existingConfig) {
            console.warn('[WARN] Config exists: ' + existingConfig.filename + '. Rewriting');
        }
        const newPath = path.join(this.destinationPath, name + '.json');
        const generatedConfig = JSON.stringify(config, null, 4);
        fs.writeFileSync(newPath, generatedConfig);
    }
    getSpecificConfig(name, env, options) {
        const directory = path.join(this.configPath, env);
        const configs = this.getConfigsInDirectory(directory, options);
        return configs.find(configFile => configFile.name == name);
    }
}
exports.ConfigBuilder = ConfigBuilder;
