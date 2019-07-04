import * as React from 'react';
import styled from 'styled-components';
import { useQuery } from '../../../../common/lib/react-hooks/useQuery';
import { CommonProps } from '../../../../common/types/CommonProps';
import { BooksTitle } from './ApolloTypes/BooksTitle';
import { BOOKS_TITLE_QUERY } from './Graphql';

interface Props extends CommonProps {}

const BookTitleDisplay: React.FC<Props> = ({ className }) => {
    const { data, loading } = useQuery<BooksTitle>(BOOKS_TITLE_QUERY);

    return (
        <Root className={className}>
            {data.development ? data.development.books.map(book => book.title).join(', ') : 'No data'}
            {loading ? ' - Loading' : ''}
        </Root>
    );
};

const Root = styled.div``;

export { BookTitleDisplay, Props };
