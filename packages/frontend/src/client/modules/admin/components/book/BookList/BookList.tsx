import React from 'react';
import { Datagrid, EditButton, List, ListProps, ReferenceField, TextField } from 'react-admin';
import { ResourceName } from '../../../lib/dataProvider/ResourceName';

export const BookList = (props: ListProps) => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="title" />
            <ReferenceField source="relations.author.id" reference={ResourceName.AUTHOR}>
                <TextField source="name" />
            </ReferenceField>
            <EditButton />
        </Datagrid>
    </List>
);
