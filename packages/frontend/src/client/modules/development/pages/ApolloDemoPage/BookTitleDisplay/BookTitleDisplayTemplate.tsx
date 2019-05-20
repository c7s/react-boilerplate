import * as React from 'react';
import { QueryResult } from 'react-apollo';
import styled from 'styled-components';
import { useApolloErrorReporter } from '../../../../common/lib/react-hooks/useApolloErrorReporter';
import { CommonProps } from '../../../../common/types/CommonProps';
import { BooksTitle } from './ApolloTypes/BooksTitle';

interface Props extends CommonProps {
    booksDisplayQueryResult: QueryResult<Partial<BooksTitle>>;
}

const BookTitleDisplayTemplate: React.FC<Props> = ({ className, booksDisplayQueryResult }) => {
    useApolloErrorReporter(booksDisplayQueryResult);

    const { data: booksDisplayData = {} } = booksDisplayQueryResult;

    return (
        <Root className={className}>
            {booksDisplayData.development
                ? booksDisplayData.development.books.map(book => `${book.title} - `)
                : 'No data'}
            {booksDisplayQueryResult.loading ? ' - Loading' : ''}
        </Root>
    );
};

const Root = styled.div``;

export { BookTitleDisplayTemplate, Props };
