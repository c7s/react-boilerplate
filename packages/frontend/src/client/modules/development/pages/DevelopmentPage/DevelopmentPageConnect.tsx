import gql from 'graphql-tag';
import * as React from 'react';
import { Query } from 'react-apollo';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { bindActionCreators, Dispatch } from 'redux';
import { StoreState } from '../../../common/lib/IsomorphicStore';
import { routes } from '../../../common/lib/routes';
import { withRouter } from '../../../common/lib/withRouter';
import { onMessageAdd } from '../../../common/store/actions';
import { LoadedFontStatus, Message } from '../../../common/store/types';
import { Books } from './ApolloTypes/Books';
import { DevelopmentPageBehaviour } from './DevelopmentPageBehaviour';
import { CurrentCommonProps } from './DevelopmentPageTemplate';

/** Props to render component connect. Don't forget to extend CurrentCommonProps */

interface Props extends CurrentCommonProps {
    name?: string;
}

/** Props to render Redux layer */

type ReduxProps = Props & RouteComponentProps<FirstArgument<typeof routes.DEVELOPMENT.pathWithParams>>;

/** Types for Redux */

interface MapProps {
    loadedFontStatus: LoadedFontStatus;
}

interface DispatchProps {
    onMessageAdd(message: Message): void;
}

/** Props to render Apollo layer. The most tricky part, so pay attention while adding/deleting Redux & Router */

type ApolloProps = ReduxProps & MapProps & DispatchProps;

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

const DevelopmentPageConnect = withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    )((props: ApolloProps) => (
        <Query<Partial<Books>> query={BOOKS_QUERY}>
            {booksQueryResult => {
                return <DevelopmentPageBehaviour {...props} booksQueryResult={booksQueryResult} />;
            }}
        </Query>
    )),
);

function mapStateToProps(state: StoreState /* , ownProps: ReduxProps */): MapProps {
    return {
        loadedFontStatus: state.common.loadedFontStatus,
    };
}

function mapDispatchToProps(dispatch: Dispatch /* , ownProps: ReduxProps */): DispatchProps {
    return bindActionCreators(
        {
            onMessageAdd,
        },
        dispatch,
    );
}

/** Single export is mandatory */

export { DevelopmentPageConnect, Props };
