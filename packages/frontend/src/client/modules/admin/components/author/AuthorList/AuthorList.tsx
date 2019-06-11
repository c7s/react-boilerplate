import React from 'react';
import { Datagrid, EditButton, List, ListProps, TextField } from 'react-admin';

export const AuthorList = (props: ListProps) => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="name" />
            <EditButton />
        </Datagrid>
    </List>
);
