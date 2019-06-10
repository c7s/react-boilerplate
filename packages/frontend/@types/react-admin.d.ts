declare module 'react-admin' {
    type Identifier = string | number;

    interface ReactAdminComponentProps {
        basePath: string;
    }
    interface ReactAdminComponentPropsWithId {
        id: Identifier;
        basePath: string;
    }
    export interface ResourceProps {
        name: string;
        list?: React.ComponentType<ReactAdminComponentProps>;
        create?: React.ComponentType<ReactAdminComponentProps>;
        edit?: React.ComponentType<ReactAdminComponentPropsWithId>;
        show?: React.ComponentType<ReactAdminComponentPropsWithId>;
        icon?: React.ComponentType<any>;
        options?: object;
    }
    export const Resource: React.ComponentType<ResourceProps>;

    type DataProvider = (type: string, resource: string, params: any) => Promise<any>;
    export interface AdminProps {
        dataProvider: DataProvider;
    }
    export const Admin: React.ComponentType<AdminProps>;

    export const ListGuesser: React.ComponentType<ReactAdminComponentProps>;
}
