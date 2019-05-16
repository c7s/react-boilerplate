/** Official types don't match GlobalFetch['fetch'], as they should by documentation */
declare module 'node-fetch' {
    const fetch: GlobalFetch['fetch'];
    // eslint-disable-next-line import/no-default-export
    export default fetch;
}
