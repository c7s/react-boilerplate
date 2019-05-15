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
import { Licenses } from './ApolloTypes/Licenses';
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

const LICENSE_FRAGMENT = gql`
    fragment License on License {
        nickname
        description
    }
`;

const LICENSES_QUERY = gql`
    query Licenses {
        licenses {
            ...License
        }
    }
    ${LICENSE_FRAGMENT}
`;

/** HOC order is mandatory. Don't forget to make query result Partial<> (like Query<Partial<Licenses>>) */

const DevelopmentPageConnect = withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    )((props: ApolloProps) => (
        <Query<Partial<Licenses>> query={LICENSES_QUERY}>
            {licensesQueryResult => (
                <DevelopmentPageBehaviour
                    {...props}
                    querySingle={props.match.params.query && props.match.params.query.querySingle}
                    queryArray={props.match.params.query && props.match.params.query.queryArray}
                    id={props.match.params.id ? props.match.params.id : 'no data'}
                    licensesQueryResult={licensesQueryResult}
                />
            )}
        </Query>
    )),
);

function mapStateToProps(state: StoreState /*, ownProps: ReduxProps */): MapProps {
    return {
        loadedFontStatus: state.common.loadedFontStatus,
    };
}

function mapDispatchToProps(dispatch: Dispatch /*, ownProps: ReduxProps */): DispatchProps {
    return bindActionCreators(
        {
            onMessageAdd,
        },
        dispatch,
    );
}

/** Single export is mandatory */

export { DevelopmentPageConnect, Props };
