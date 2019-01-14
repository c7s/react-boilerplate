import { mkdirSync } from 'fs';
import { join } from 'path';
import { ConfigFile } from './ConfigFile';
import { Helper } from './Helper';

export type OptionalParams = {
    destPath?: string;
    isUsingFracturedConfigs?: boolean
};

type CachedConfig = {
    name: string;
    env: string;
    content: any;
};

function removeFromNodeCache(id: string): void {
    delete require.cache[require.resolve(id)];
}

type GetConfigOptions = {
    suppressWarnings?: boolean;
};

const envVariants = ['dev', 'qa', 'prod'];

export class ConfigBuilder {

    private baseConfigs: ConfigFile[] = [];
    private readonly cachedConfigs: CachedConfig[] = [];
    private readonly configPath: string;
    private isUsingFracturedConfigs: boolean;
    private env: string;
    private readonly ENV_ERROR_STRING =
        'You must set enviroment with "setEnviroment" ' +
        'or pass it directly to executed method argument';

    constructor(configPath: string, params: OptionalParams = {}) {
        if (!Helper.isDirectory(configPath)) {
            throw new Error(`Path ${configPath} is not a valid directory`);
        }
        this.configPath = configPath;

        const dest = params.destPath || configPath;
        if (!Helper.isDirectory(dest)) {
            mkdirSync(dest);
        }

        this.isUsingFracturedConfigs = params.isUsingFracturedConfigs || false;
        this.loadBaseConfigs();
    }

    public set enviroment(env: string) {
        this.validateEnv(env);
        this.env = env;
    }

    public get enviroment(): string {
        return this.env;
    }

    public getConfig(name: string, passedEnv?: string): any {
        const env = passedEnv || this.env;
        if (!env) {
            throw new Error(this.ENV_ERROR_STRING);
        }
        this.validateEnv(env);
        const baseConfig = this.baseConfigs.find(config => config.name == name);
        if (!baseConfig) {
            throw new Error(`Cant find base config with name ${name}`);
        }

        const cachedConfig = this.cachedConfigs.find(cached =>
            cached.name == name && cached.env == env);

        return cachedConfig ?
            cachedConfig.content :
            this.generateConfig(baseConfig, env);
    }

    public printConfigs(passedEnv?: string) {
        const env = passedEnv ? passedEnv : this.env;
        if (!env) {
            throw new Error(this.ENV_ERROR_STRING);
        }
        this.validateEnv(env);
        this.baseConfigs.forEach(configFile => {
            console.log(`===== ${configFile.name} =====`);
            const config = this.getConfig(configFile.name, env);
            console.log(JSON.stringify(config, null, 4));
        });
    }

    public reload(): void {
        try {
            this.loadBaseConfigs();
            this.cachedConfigs.forEach(cachedConfig => {
                const baseConfig = this.baseConfigs.find(config => {
                    return config.name === cachedConfig.name;
                });
                if (baseConfig) {
                    let result: any;
                    removeFromNodeCache(baseConfig.path);
                    result = { ...baseConfig.getContent() };
                    const envConfig = this.getSpecificConfig(
                        baseConfig.name,
                        cachedConfig.env
                    );
                    if (envConfig) {
                        removeFromNodeCache(envConfig.path);
                        result = {
                            ...result,
                            ...envConfig.getContent(),
                        };
                    }
                    const localConfig = this.getSpecificConfig(
                        baseConfig.name,
                        'local',
                        { suppressWarnings: true }
                    );
                    if (localConfig) {
                        removeFromNodeCache(localConfig.path);
                        result = {
                            ...result,
                            ...localConfig.getContent(),
                        };
                    }
                    cachedConfig.content = {
                        ...cachedConfig.content,
                        ...result,
                    };
                }
            });
        } catch (err) {
            console.warn(err);
        }
    }

    private generateConfig(baseConfig: ConfigFile, env: string): any {
        let result = baseConfig.getContent();

        const envConfig = this.getSpecificConfig(baseConfig.name, env);
        if (envConfig) {
            const envContent = envConfig.getContent();
            result = {
                ...result,
                ...envContent,
            };
        }

        const localConfig = this.getSpecificConfig(
            baseConfig.name,
            'local',
            { suppressWarnings: true },
        );

        if (localConfig) {
            const localContent = localConfig.getContent();
            result = {
                ...result,
                ...localContent,
            };
        }

        this.cachedConfigs.push({
            name: baseConfig.name,
            env: env,
            content: result
        });

        return result;
    }

    private loadBaseConfigs() {
        const directory = join(this.configPath, 'base');

        this.baseConfigs = this.getConfigsInDirectory(directory);
    }

    private getConfigsInDirectory(
        directory: string,
        options: GetConfigOptions = {}
    ): ConfigFile[] {
        if (Helper.isDirectory(directory)) {
            const paths = this.isUsingFracturedConfigs ?
                Helper.getConfigAllPathList(directory) :
                Helper.getConfigFilePathList(directory);

            return paths.map(path => new ConfigFile(path));
        } else if (options.suppressWarnings) {
            console.warn(`[WARN] Cant find directory ${directory}`);
        }
        return [];
    }

    private getSpecificConfig(
        name: string,
        env: string,
        options: GetConfigOptions = {},
    ): ConfigFile | undefined {
        const directory = join(this.configPath, env);
        const configs = this.getConfigsInDirectory(directory, options);

        return configs.find(configFile => configFile.name == name);
    }

    private validateEnv(env: string = ''): void {
        if (envVariants.indexOf(env) < 0) {
            throw new Error('Invalid enviroment. Env will be on of ');
        }
    }
}
