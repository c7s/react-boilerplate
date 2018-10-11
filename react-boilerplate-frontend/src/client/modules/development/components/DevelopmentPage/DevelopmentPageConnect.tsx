import gql from 'graphql-tag';
import * as React from 'react';
import { Query } from 'react-apollo';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { StoreState } from '../../../../IsomorphicStore';
import { RouteComponentPropsQuery, withRouterQuery } from '../../../common/lib/withRouterQuery';
import { LoadedFontStatus, Media } from '../../../common/store/types';
import { Licenses } from './ApolloTypes/Licenses';
import { DevelopmentPageBehaviour } from './DevelopmentPageBehaviour';
import { CurrentCommonProps } from './DevelopmentPageTemplate';

/** Props to render component connect. Don't forget to extend CurrentCommonProps */

interface Props extends CurrentCommonProps {
    name?: string;
}

/** Props to render Redux layer */

type ReduxProps = Props & RouteComponentPropsQuery<{ id: string }, { queryFirst?: string; querySecond?: string }>;

/** Types for Redux */

interface MapProps {
    loadedFontStatus: LoadedFontStatus;
    media: Media;
}

interface DispatchProps {}

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

const DevelopmentPageConnect = withRouterQuery(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    )((props: ApolloProps) => (
        <Query<Partial<Licenses>> query={LICENSES_QUERY}>
            {licenses => (
                <DevelopmentPageBehaviour
                    {...props}
                    queryFirst={props.queryParams.queryFirst}
                    id={props.match.params.id}
                    licenses={licenses}
                />
            )}
        </Query>
    )),
);

function mapStateToProps(state: StoreState, ownProps: ReduxProps): MapProps {
    console.warn(`${ownProps.name} could also be used`);
    return {
        loadedFontStatus: state.common.loadedFontStatus,
        media: state.common.media,
    };
}

function mapDispatchToProps(dispatch: Dispatch, ownProps: ReduxProps): DispatchProps {
    console.warn(`${ownProps.name} could also be used`);
    return bindActionCreators({}, dispatch);
}

/** Single export is mandatory */

export { DevelopmentPageConnect, Props };
