/** Webpack-defined, not real variables */
declare const CLIENT_BUNDLE_NAME: string;
declare const WEB_MANIFEST_PATH: string;
declare const BROWSER_CONFIG_PATH: string;
declare const BUILD_TIMESTAMP: number;
declare const SSR_MODE: boolean;

/** Variables on window. Global is used due to isomorphic rendering */
declare namespace NodeJS {
    interface Global {
        /** Config part */
        GRAPHQL_ENDPOINT: string;
        GITHUB_TOKEN: string;
        PUBLIC_PATH: string;
        /** Dynamic server data part */
        APOLLO_STATE: { [key: string]: { [key: string]: object } } | undefined;
        REDUX_STATE: object | undefined;
        SSR_ERROR: Error | undefined;
    }
}
