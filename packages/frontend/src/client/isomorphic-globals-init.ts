import * as Config from '../../config';

/** If client-side, all globals are initialized via 'window' */

let config: typeof Config.config | null = null;
if (SSR_MODE) {
    // eslint-disable-next-line global-require
    config = require('../../config').config as typeof Config.config;

    /** If server-side, initialize all globals */
    global.GRAPHQL_ENDPOINT = config.api.graphqlEndpoint;
    global.PUBLIC_PATH = config.root.publicPath;
    global.BASENAME = config.root.basename;
    global.CANONICAL_ROBOTS_HOST = config.root.canonicalRobotsHost;
    global.IS_OUTPUT_APP_INFO = config.root.isOutputAppInfo;
    global.IS_SHOW_DEV_PAGES = config.root.isShowDevPages;
    global.IS_DISABLE_SSR = config.root.isDisableSsr;
}

/** https://webpack.js.org/guides/public-path/#on-the-fly */
// eslint-disable-next-line @typescript-eslint/camelcase
__webpack_public_path__ = global.PUBLIC_PATH;
