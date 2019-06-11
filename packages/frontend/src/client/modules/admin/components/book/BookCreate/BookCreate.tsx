import * as React from 'react';
import {
    Create,
    DisabledInput,
    ReactAdminComponentProps,
    ReferenceInput,
    SelectInput,
    SimpleForm,
    TextInput,
} from 'react-admin';
import { ResourceName } from '../../../lib/dataProvider/ResourceName';

export const BookCreate = (props: ReactAdminComponentProps) => (
    <Create {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="title" />
            <ReferenceInput source="relations.author.id" reference={ResourceName.AUTHOR}>
                <SelectInput optionText="name" />
            </ReferenceInput>
        </SimpleForm>
    </Create>
);
