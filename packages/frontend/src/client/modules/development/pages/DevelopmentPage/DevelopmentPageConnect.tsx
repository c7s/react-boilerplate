import gql from 'graphql-tag';
import * as React from 'react';
import { Query } from 'react-apollo';
import { RouteComponentProps } from 'react-router';
import { routes } from '../../../common/lib/routes';
import { withRouter } from '../../../common/lib/withRouter';
import { CommonProps } from '../../../common/types/CommonProps';
import { Books } from './ApolloTypes/Books';
import { DevelopmentPage } from './DevelopmentPage';

/** Props to render component connect. Don't forget to extend CurrentCommonProps */

interface Props extends CommonProps {
    name?: string;
}

/** Props to render Redux layer */

type ReduxProps = Props & RouteComponentProps<FirstArgument<typeof routes.DEVELOPMENT.pathWithParams>>;

/** Props to render Apollo layer. The most tricky part, so pay attention while adding/deleting Redux & Router */

type ApolloProps = ReduxProps;

/** Graphql code could be in 'DevelopmentPageGraphql.ts' */

const BOOK_FULL_FRAGMENT = gql`
    fragment BookFull on Book {
        author
        title
    }
`;

const BOOKS_QUERY = gql`
    query Books {
        development {
            books {
                ...BookFull
            }
        }
    }
    ${BOOK_FULL_FRAGMENT}
`;

/** HOC order is mandatory. Don't forget to make query result Partial<> (like Query<Partial<Licenses>>) */

const DevelopmentPageConnect = withRouter((props: ApolloProps) => (
    <Query<Partial<Books>> query={BOOKS_QUERY}>
        {booksQueryResult => {
            return <DevelopmentPage {...props} booksQueryResult={booksQueryResult} />;
        }}
    </Query>
));

/** Single export is mandatory */

export { DevelopmentPageConnect, Props };
