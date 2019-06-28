import * as React from 'react';
import styled from 'styled-components';
import { useAppQuery } from '../../../../common/lib/react-hooks/useQuery';
import { CommonProps } from '../../../../common/types/CommonProps';
import { BooksAuthor } from './ApolloTypes/BooksAuthor';
import { BOOKS_AUTHOR_QUERY } from './Graphql';

interface Props extends CommonProps {}

const BookAuthorDisplay: React.FC<Props> = ({ className }) => {
    const { data: booksData, loading: booksLoading } = useAppQuery<BooksAuthor>(BOOKS_AUTHOR_QUERY);

    return (
        <Root className={className}>
            {booksData.development ? booksData.development.books.map(book => book.author).join(', ') : 'No data'}
            {booksLoading ? ' - Loading' : ''}
        </Root>
    );
};

const Root = styled.div``;

export { BookAuthorDisplay, Props };
