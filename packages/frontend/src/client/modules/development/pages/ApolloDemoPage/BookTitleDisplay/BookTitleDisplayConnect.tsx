import gql from 'graphql-tag';
import * as React from 'react';
import { Query } from 'react-apollo';
import { CommonProps } from '../../../../common/types/CommonProps';
import { BooksTitle } from './ApolloTypes/BooksTitle';
import { BookTitleDisplayTemplate } from './BookTitleDisplayTemplate';

interface Props extends CommonProps {}

const BOOKS_TITLE_QUERY = gql`
    query BooksTitle {
        books {
            title
        }
    }
`;

const BookTitleDisplayConnect = (props: Props) => (
    <Query<Partial<BooksTitle>> query={BOOKS_TITLE_QUERY}>
        {booksDisplayQueryResult => (
            <BookTitleDisplayTemplate booksDisplayQueryResult={booksDisplayQueryResult} {...props} />
        )}
    </Query>
);

export { BookTitleDisplayConnect, Props };
