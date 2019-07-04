import * as React from 'react';
import styled from 'styled-components';
import { useQuery } from '../../../../common/lib/react-hooks/useQuery';
import { CommonProps } from '../../../../common/types/CommonProps';
import { BooksAuthor } from './ApolloTypes/BooksAuthor';
import { BOOKS_AUTHOR_QUERY } from './Graphql';

interface Props extends CommonProps {}

const BookAuthorDisplay: React.FC<Props> = ({ className }) => {
    const { data, loading } = useQuery<BooksAuthor>(BOOKS_AUTHOR_QUERY);

    return (
        <Root className={className}>
            {data.development ? data.development.books.map(book => book.author).join(', ') : 'No data'}
            {loading ? ' - Loading' : ''}
        </Root>
    );
};

const Root = styled.div``;

export { BookAuthorDisplay, Props };
