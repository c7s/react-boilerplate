export = ConfigNamespace;

declare namespace ConfigNamespace {
    interface Config {
        root: RootConfig;
        api: ApiConfig;
    }

    interface RootConfig {
        publicPath: string;
        devServerPort: number;
    }

    interface ApiConfig {
        graphqlEndpoint: string;
        githubToken: string;
        restUrl: string;
    }

    const config: Config;
}
