// eslint-disable-next-line no-use-before-define,@typescript-eslint/no-use-before-define
export = ConfigNamespace;

declare namespace ConfigNamespace {
    interface Config {
        root: RootConfig;
        api: ApiConfig;
    }

    interface RootConfig {
        publicPath: string;
        basename: string;
        canonicalRobotsHost: string;
        devServerPort: number;
        isOutputAppInfo: boolean;
        isShowDevPages: boolean;
    }

    interface ApiConfig {
        graphqlEndpoint: string;
        restUrl: string;
    }

    const config: Config;
}
