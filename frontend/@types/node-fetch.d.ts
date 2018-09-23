/** Official types don't match GlobalFetch['fetch'], as they should by documentation */
declare module 'node-fetch' {
    const fetch: GlobalFetch['fetch'];
    export default fetch;
}
