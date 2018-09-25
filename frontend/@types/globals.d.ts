/** Webpack-defined, not real variables */
declare const GRAPHQL_ENDPOINT: string;
declare const GITHUB_TOKEN: string;
declare const CLIENT_BUNDLE_NAME: string;
declare const STATIC_DIRECTORY_NAME: string;
declare const WEB_MANIFEST_PATH: string;
declare const BROWSER_CONFIG_PATH: string;
declare const BUILD_TIMESTAMP: number;
declare const SSR_MODE: boolean;

/** Variables on window. Global is used due to isomorphic rendering */
declare namespace NodeJS {
    interface Global {
        APOLLO_STATE: { [key: string]: { [key: string]: object } } | undefined;
        REDUX_STATE: object | undefined;
        SSR_ERROR: Error | undefined;
    }
}
