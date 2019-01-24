export function logAppInfo() {
    if (global.IS_OUTPUT_APP_INFO && !SSR_MODE) {
        console.groupCollapsed('App info');

        console.info(
            `SSR_ERROR:        %c${global.SSR_ERROR ? global.SSR_ERROR.message : 'No error'}
%cBUILD_TIME:       ${new Date(BUILD_TIMESTAMP).toLocaleString()}
GRAPHQL_ENDPOINT: ${global.GRAPHQL_ENDPOINT}`,
            global.SSR_ERROR ? 'color: red;' : 'color: green',
            '',
        );

        console.info('%cSSR can be prevented by passing __FAIL_SSR__ in query parameters', 'color: yellow');

        console.groupEnd();
    }
}
