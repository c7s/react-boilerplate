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
        isOutputAppInfo: boolean;
        isShowDevPages: boolean;
        isDisableSsr: boolean;
    }

    interface ApiConfig {
        graphqlEndpoint: string;
        restUrl: string;
    }

    const config: Config;
}
