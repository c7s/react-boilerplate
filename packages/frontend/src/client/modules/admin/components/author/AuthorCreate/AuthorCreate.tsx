import * as React from 'react';
import { Create, DisabledInput, ReactAdminComponentProps, SimpleForm, TextInput } from 'react-admin';

export const AuthorCreate = (props: ReactAdminComponentProps) => (
    <Create {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="name" />
        </SimpleForm>
    </Create>
);
