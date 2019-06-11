import * as React from 'react';
import { Admin, DataProvider, Resource } from 'react-admin';
import { useIsClientSide } from '../../../common/lib/react-hooks/useIsClientSide';
import { CommonProps } from '../../../common/types/CommonProps';
import { AuthorList } from '../../components/author/AuthorList';
import { BookList } from '../../components/book/BookList';
import { dataProvider } from '../../lib/dataProvider/dataProvider';
import { ResourceName } from '../../lib/dataProvider/ResourceName';

interface Props extends CommonProps {}

const AdminPage: React.FC<Props> = () => {
    const isClientSide = useIsClientSide();

    return isClientSide ? (
        <Admin dataProvider={dataProvider() as DataProvider}>
            <Resource name={ResourceName.BOOK} list={BookList} />
            <Resource name={ResourceName.AUTHOR} list={AuthorList} />
        </Admin>
    ) : null;
};

export { AdminPage, Props };
