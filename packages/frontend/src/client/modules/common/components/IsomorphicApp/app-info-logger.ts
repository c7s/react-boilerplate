if (global.IS_OUTPUT_APP_INFO && !SSR_MODE) {
    console.groupCollapsed('App info');

    console.info(`SSR_ERROR: ${global.SSR_ERROR ? global.SSR_ERROR.message : 'none'}
BUILD_TIME: ${new Date(BUILD_TIMESTAMP).toLocaleString()}
GRAPHQL_ENDPOINT: ${global.GRAPHQL_ENDPOINT}`);

    console.groupEnd();
}
