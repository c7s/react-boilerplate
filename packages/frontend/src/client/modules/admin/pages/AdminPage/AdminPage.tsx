import * as React from 'react';
import { Admin, DataProvider, Resource } from 'react-admin';
import { Page } from '../../../common/components/Page';
import { useIsClientSide } from '../../../common/lib/react-hooks/useIsClientSide';
import { CommonProps } from '../../../common/types/CommonProps';
import { AuthorCreate } from '../../components/author/AuthorCreate';
import { AuthorEdit } from '../../components/author/AuthorEdit';
import { AuthorList } from '../../components/author/AuthorList';
import { BookCreate } from '../../components/book/BookCreate';
import { BookEdit } from '../../components/book/BookEdit';
import { BookList } from '../../components/book/BookList';
import { dataProvider } from '../../lib/dataProvider/dataProvider';
import { ResourceName } from '../../lib/dataProvider/ResourceName';

interface Props extends CommonProps {}

const AdminPage: React.FC<Props> = () => {
    const isClientSide = useIsClientSide();

    return isClientSide ? (
        <Page hideHeader hideFooter documentTitle="Admin Panel">
            <Admin dataProvider={dataProvider() as DataProvider}>
                <Resource name={ResourceName.BOOK} list={BookList} create={BookCreate} edit={BookEdit} />
                <Resource name={ResourceName.AUTHOR} list={AuthorList} create={AuthorCreate} edit={AuthorEdit} />
            </Admin>
        </Page>
    ) : null;
};

export { AdminPage, Props };
