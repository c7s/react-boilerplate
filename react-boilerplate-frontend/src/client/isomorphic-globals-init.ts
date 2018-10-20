import * as Config from '../../config';

/** If client-side, all globals are initialized via 'window' */

let config: typeof Config.config | null = null;
if (SSR_MODE) {
    config = require('../../config').config as typeof Config.config;

    /** If server-side, initialize all globals */
    global.GRAPHQL_ENDPOINT = config.api.graphqlEndpoint;
    global.GITHUB_TOKEN = config.api.githubToken;
    global.PUBLIC_PATH = config.root.publicPath;
}

/** https://webpack.js.org/guides/public-path/#on-the-fly */
__webpack_public_path__ = global.PUBLIC_PATH;
