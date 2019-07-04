import * as React from 'react';
import { QueryResult } from 'react-apollo';
import styled from 'styled-components';
import { useApolloErrorProcessor } from '../../../../common/lib/react-hooks/useApolloErrorProcessor';
import { CommonProps } from '../../../../common/types/CommonProps';
import { BooksAuthor } from './ApolloTypes/BooksAuthor';

interface Props extends CommonProps {
    booksDisplayQueryResult: QueryResult<Partial<BooksAuthor>>;
}

const BookAuthorDisplay: React.FC<Props> = ({ className, booksDisplayQueryResult }) => {
    useApolloErrorProcessor(booksDisplayQueryResult);

    const { data: booksDisplayData = {} } = booksDisplayQueryResult;

    return (
        <Root className={className}>
            {booksDisplayData.development
                ? booksDisplayData.development.books.map(book => book.author).join(', ')
                : 'No data'}
            {booksDisplayQueryResult.loading ? ' - Loading' : ''}
        </Root>
    );
};

const Root = styled.div``;

export { BookAuthorDisplay, Props };
