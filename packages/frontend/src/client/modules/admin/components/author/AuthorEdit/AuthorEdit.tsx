import * as React from 'react';
import { DisabledInput, Edit, ReactAdminComponentPropsWithId, SimpleForm, TextInput } from 'react-admin';

export const AuthorEdit = (props: ReactAdminComponentPropsWithId) => (
    <Edit {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="name" />
        </SimpleForm>
    </Edit>
);
