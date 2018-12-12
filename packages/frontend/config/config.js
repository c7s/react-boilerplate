/**
 * @enum {string}
 */
const Env = {
    DEV: 'dev',
    QA: 'qa',
    RT: 'rt',
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
        /** Note trailing slash */
        publicPath: process.env.REACT_BOILERPLATE_PUBLIC_PATH || '/static/',
        devServerPort: 3000,
        isOutputAppInfo: process.env.REACT_BOILERPLATE_ENV !== Env.PROD,
    },
    api: {
        graphqlEndpoint: process.env.REACT_BOILERPLATE_GRAPHQL_ENDPOINT || 'https://api.github.com/graphql',
        githubToken: process.env.REACT_BOILERPLATE_GITHUB_TOKEN || '',
    },
};
