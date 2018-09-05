module.exports = {
    graphqlEndpoint: process.env.REACT_BOILERPLATE_GRAPHQL_ENDPOINT || '',
    graphqlBuildEndpoint:
        process.env.REACT_BOILERPLATE_GRAPHQL_BUILD_ENDPOINT || process.env.REACT_BOILERPLATE_GRAPHQL_ENDPOINT || '',
    githubToken: process.env.REACT_BOILERPLATE_GITHUB_TOKEN || '',
    restUrl: process.env.REACT_BOILERPLATE_REST_URL || '',
};
