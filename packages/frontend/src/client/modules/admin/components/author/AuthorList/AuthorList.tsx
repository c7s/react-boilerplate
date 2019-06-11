import React from 'react';
import { Datagrid, List, ListProps, TextField } from 'react-admin';

export const AuthorList = (props: ListProps) => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="name" />
        </Datagrid>
    </List>
);
