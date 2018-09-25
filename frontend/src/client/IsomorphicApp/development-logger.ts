if (process.env.NODE_ENV === 'development') {
    console.log(`SSR_ERROR: ${global.SSR_ERROR || 'none'}
BUILD_TIME: ${new Date(BUILD_TIMESTAMP).toLocaleString()}
GRAPHQL_ENDPOINT: ${GRAPHQL_ENDPOINT}`);
}
