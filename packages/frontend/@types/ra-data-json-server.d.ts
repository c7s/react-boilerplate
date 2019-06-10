declare module 'ra-data-json-server' {
    type DataProvider = (type: string, resource: string, params: any) => Promise<any>;

    interface RaDataJsonServer {
        (path: string): DataProvider;
    }

    const jsonServerProvider: RaDataJsonServer;

    // eslint-disable-next-line import/no-default-export
    export default jsonServerProvider;
}
