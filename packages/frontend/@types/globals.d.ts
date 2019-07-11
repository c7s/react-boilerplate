/** Webpack-defined, not real variables */
declare const APP_NAME: string;
declare const APP_SHORT_NAME: string;
declare const APP_DESCRIPTION: string;
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
        PUBLIC_PATH: string;
        BASENAME: string;
        CANONICAL_ROBOTS_HOST: string;
        IS_OUTPUT_APP_INFO: boolean;
        IS_SHOW_DEV_PAGES: boolean;
        IS_DISABLE_SSR: boolean;
        /** Dynamic server data part */
        APOLLO_STATE: { [key: string]: { [key: string]: object } } | undefined;
        SSR_ERROR: Error | undefined;
    }
}

/** At least one field is required */
type NavigatorShareData =
    | { url: string; text?: string; title?: string }
    | { url?: string; text: string; title?: string }
    | { url?: string; text?: string; title: string };

interface Navigator {
    share?(data: NavigatorShareData): Promise<void>;
}
