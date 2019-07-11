/**
 * @enum {string}
 */
const Env = {
    DEV: 'dev',
    QA: 'qa',
    PROD: 'prod',
};

if (!process.env.REACT_BOILERPLATE_ENV) {
    process.env.REACT_BOILERPLATE_ENV = Env.DEV;

    // eslint-disable-next-line no-console
    console.log(`REACT_BOILERPLATE_ENV is not defined, assuming it's ${process.env.REACT_BOILERPLATE_ENV}`);
}

/** Use 'process.env.REACT_BOILERPLATE_ENV' to adjust variables according to current environment */
module.exports = {
    root: {
        /** Note trailing slash. May also be absolute */
        publicPath: process.env.REACT_BOILERPLATE_PUBLIC_PATH || '/static/',
        /** In case the app is being served from non-root path, like '/react-boilerplate' */
        basename: process.env.REACT_BOILERPLATE_BASENAME || '',
        /** Always with protocol. Is used in robots.txt and OG tags */
        canonicalRobotsHost: process.env.REACT_BOILERPLATE_CANONICAL_ROBOTS_HOST || 'http://react-boilerplate.com',
        devServerPort: 3000,
        isOutputAppInfo: process.env.REACT_BOILERPLATE_ENV !== Env.PROD,
        isShowDevPages: process.env.REACT_BOILERPLATE_ENV === Env.DEV,
        isDisableSsr: process.env.REACT_BOILERPLATE_IS_DISABLE_SSR || false,
    },
    api: {
        graphqlEndpoint: process.env.REACT_BOILERPLATE_GRAPHQL_ENDPOINT || 'https://react-boilerplate-demo.glitch.me',
    },
};
