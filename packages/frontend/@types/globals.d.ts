/** Webpack-defined, not real variables */
declare const APP_NAME: string;
declare const APP_SHORT_NAME: string;
declare const CLIENT_BUNDLE_NAME: string;
declare const WEB_MANIFEST_PATH: string;
declare const BROWSER_CONFIG_PATH: string;
declare const ROBOTS_PATH: string;
declare const BUILD_TIMESTAMP: number;
declare const SSR_MODE: boolean;

/** Variables on window. Global is used due to isomorphic rendering */
declare namespace NodeJS {
    interface Global {
        /** Config part */
        GRAPHQL_ENDPOINT: string;
        GITHUB_TOKEN: string;
        PUBLIC_PATH: string;
        CANONICAL_ROBOTS_HOST: string;
        IS_OUTPUT_APP_INFO: boolean;
        /** Dynamic server data part */
        APOLLO_STATE: { [key: string]: { [key: string]: object } } | undefined;
        REDUX_STATE: object | undefined;
        SSR_ERROR: Error | undefined;
    }
}
