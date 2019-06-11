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
    export const EditGuesser: React.ComponentType<ReactAdminComponentPropsWithId>;

    export interface ListProps extends ReactAdminComponentProps {
        filters?: React.ReactNode;
    }
    export const List: React.ComponentType<ListProps>;

    export interface EditProps extends ReactAdminComponentPropsWithId {
        title?: React.ReactNode;
    }
    export const Edit: React.ComponentType<EditProps>;

    export interface CreateProps extends ReactAdminComponentProps {}
    export const Create: React.ComponentType<CreateProps>;

    export interface DatagridProps {
        rowClick?: 'edit';
    }
    export const Datagrid: React.ComponentType<DatagridProps>;

    export interface TextFieldProps {
        source: string;
    }
    export const TextField: React.ComponentType<TextFieldProps>;

    export interface EmailFieldProps {
        source: string;
    }
    export const EmailField: React.ComponentType<EmailFieldProps>;

    export interface UrlFieldProps {
        source: string;
    }
    export const UrlField: React.ComponentType<UrlFieldProps>;

    export interface ReferenceFieldProps {
        source: string;
        reference: string;
    }
    export const ReferenceField: React.ComponentType<ReferenceFieldProps>;

    export interface EditButtonProps {}
    export const EditButton: React.ComponentType<EditButtonProps>;

    export interface SimpleFormProps {}
    export const SimpleForm: React.ComponentType<SimpleFormProps>;

    export interface ReferenceInputProps {
        source: string;
        reference: string;
        label?: string;
        allowEmpty?: boolean;
        children: React.ReactNode;
    }
    export const ReferenceInput: React.ComponentType<ReferenceInputProps>;

    export interface SelectInputProps {
        optionText: string;
    }
    export const SelectInput: React.ComponentType<SelectInputProps>;

    export interface TextInputProps {
        source: string;
        label?: string;
        alwaysOn?: boolean;
    }
    export const TextInput: React.ComponentType<TextInputProps>;

    export interface DisabledInputProps {
        source: string;
    }
    export const DisabledInput: React.ComponentType<DisabledInputProps>;

    export interface LongTextInputProps {
        source: string;
    }
    export const LongTextInput: React.ComponentType<LongTextInputProps>;

    export interface FilterProps {}
    export const Filter: React.ComponentType<FilterProps>;

    export const GET_LIST: string;
    export const GET_ONE: string;
    export const GET_MANY: string;
    export const CREATE: string;
}
