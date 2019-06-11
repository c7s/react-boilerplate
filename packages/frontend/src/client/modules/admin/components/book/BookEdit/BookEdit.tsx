import * as React from 'react';
import {
    DisabledInput,
    Edit,
    ReactAdminComponentPropsWithId,
    ReferenceInput,
    SelectInput,
    SimpleForm,
    TextInput,
} from 'react-admin';
import { ResourceName } from '../../../lib/dataProvider/ResourceName';

export const BookEdit = (props: ReactAdminComponentPropsWithId) => (
    <Edit {...props}>
        <SimpleForm>
            <DisabledInput source="id" />
            <TextInput source="title" />
            <ReferenceInput source="relations.author.id" reference={ResourceName.AUTHOR}>
                <SelectInput optionText="name" />
            </ReferenceInput>
        </SimpleForm>
    </Edit>
);
