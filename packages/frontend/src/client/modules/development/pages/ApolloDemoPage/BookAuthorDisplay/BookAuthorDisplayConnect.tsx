import gql from 'graphql-tag';
import * as React from 'react';
import { Query } from 'react-apollo';
import { CommonProps } from '../../../../common/types/CommonProps';
import { BooksAuthor } from './ApolloTypes/BooksAuthor';
import { BookAuthorDisplay } from './BookAuthorDisplay';

interface Props extends CommonProps {}

const BOOKS_AUTHOR_QUERY = gql`
    query BooksAuthor {
        development {
            books {
                author
            }
        }
    }
`;

const BookAuthorDisplayConnect = (props: Props) => (
    <Query<Partial<BooksAuthor>> query={BOOKS_AUTHOR_QUERY}>
        {booksDisplayQueryResult => <BookAuthorDisplay booksDisplayQueryResult={booksDisplayQueryResult} {...props} />}
    </Query>
);

export { BookAuthorDisplayConnect, Props };
