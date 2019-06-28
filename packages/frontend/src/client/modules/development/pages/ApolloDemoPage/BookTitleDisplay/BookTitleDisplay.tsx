import * as React from 'react';
import styled from 'styled-components';
import { useAppQuery } from '../../../../common/lib/react-hooks/useQuery';
import { CommonProps } from '../../../../common/types/CommonProps';
import { BooksTitle } from './ApolloTypes/BooksTitle';
import { BOOKS_TITLE_QUERY } from './Graphql';

interface Props extends CommonProps {}

const BookTitleDisplay: React.FC<Props> = ({ className }) => {
    const { data: booksData, loading: booksLoading } = useAppQuery<BooksTitle>(BOOKS_TITLE_QUERY);

    return (
        <Root className={className}>
            {booksData.development ? booksData.development.books.map(book => book.title).join(', ') : 'No data'}
            {booksLoading ? ' - Loading' : ''}
        </Root>
    );
};

const Root = styled.div``;

export { BookTitleDisplay, Props };
