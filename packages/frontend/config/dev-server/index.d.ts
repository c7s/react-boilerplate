// eslint-disable-next-line no-use-before-define,@typescript-eslint/no-use-before-define
export = ConfigDevServerNamespace;

declare namespace ConfigDevServerNamespace {
    interface ConfigDevServer {
        port: number;
        isBuild: boolean;
    }

    const config: ConfigDevServer;
}
