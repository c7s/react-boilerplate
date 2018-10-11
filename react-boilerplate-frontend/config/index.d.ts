export = Config;

declare namespace Config {
    interface CompleteConfig {
        root: RootConfig;
        api: ApiConfig;
    }

    type Config = RootConfig | ApiConfig;

    interface RootConfig {
        env: string | ENV;
        publicPath: string;
        devServerPort: number;
    }

    interface ApiConfig {
        graphqlEndpoint: string;
        githubToken: string;
        restUrl: string;
    }

    enum CONFIG_NAME {
        ROOT = 'root',
        API = 'api',
    }

    enum ENV {
        DEV = 'dev',
        QA = 'qa',
        RT = 'rt',
        PROD = 'prod',
    }

    function getConfig(configName: string | CONFIG_NAME, customEnv?: string | ENV): Config;

    function getCompleteConfig(customEnv?: string | ENV): CompleteConfig;
}
