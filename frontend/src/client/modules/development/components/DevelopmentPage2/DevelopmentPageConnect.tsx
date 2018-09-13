import gql from 'graphql-tag';
import * as React from 'react';
import { Query } from 'react-apollo';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { bindActionCreators, Dispatch } from 'redux';
import { State } from '../../../../IsomorphicStore';
import { rootVisit } from '../../../common/store/actions';
import { Licenses } from './ApolloTypes/Licenses';
import { DevelopmentPageBehaviour } from './DevelopmentPageBehaviour';
import { ApolloOuterProps, FromReduxDispatchProps, FromReduxStateProps, ReduxOuterProps } from './DevelopmentPageTypes';

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

const DevelopmentPageConnect = withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps,
    )((props: ApolloOuterProps) => (
        <Query<Licenses> query={LICENSES_QUERY}>
            {result => (
                <DevelopmentPageBehaviour
                    {...props}
                    id={props.match.params.id}
                    licenses={(result.data && result.data.licenses) || []}
                />
            )}
        </Query>
    )),
);

function mapStateToProps(state: State, ownProps: ReduxOuterProps): FromReduxStateProps {
    console.log(`${ownProps.name} could also be used`);
    return {
        loadedFontStatus: state.common.loadedFontStatus,
    };
}

function mapDispatchToProps(dispatch: Dispatch, ownProps: ReduxOuterProps): FromReduxDispatchProps {
    console.log(`${ownProps.name} could also be used`);
    return bindActionCreators(
        {
            rootVisit,
        },
        dispatch,
    );
}

export { DevelopmentPageConnect };
