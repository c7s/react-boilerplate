import gql from 'graphql-tag';
import * as React from 'react';
import { Query } from 'react-apollo';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';
import { bindActionCreators, Dispatch } from 'redux';
import { State } from '../../../../IsomorphicStore';
import { rootVisit } from '../../../common/store/actions';
import { LoadedFontStatus } from '../../../common/store/types';
import { Licenses } from '../Test/ApolloTypes/Licenses';
import { DevelopmentPageBehaviour } from './DevelopmentPageBehaviour';
import { SCOuterProps } from './DevelopmentPageTypes';

export interface Props extends SCOuterProps {
    name?: string;
}

export type ReduxProps = Props & RouteComponentProps<{ id: string }> & SCOuterProps;

export interface StateProps {
    loadedFontStatus: LoadedFontStatus;
}

export interface DispatchProps {
    rootVisit(): void;
}

export type ApolloProps = Props & ReduxProps & StateProps & DispatchProps & SCOuterProps;

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
    )((props: ApolloProps) => (
        <Query<Licenses> query={LICENSES_QUERY}>
            {({ data }) => (
                <DevelopmentPageBehaviour
                    {...props}
                    id={props.match.params.id}
                    licenses={(data && data.licenses) || []}
                />
            )}
        </Query>
    )),
);

function mapStateToProps(state: State, ownProps: ReduxProps): StateProps {
    console.log(`${ownProps.name} could also be used`);
    return {
        loadedFontStatus: state.common.loadedFontStatus,
    };
}

function mapDispatchToProps(dispatch: Dispatch, ownProps: ReduxProps): DispatchProps {
    console.log(`${ownProps.name} could also be used`);
    return bindActionCreators(
        {
            rootVisit,
        },
        dispatch,
    );
}

export { DevelopmentPageConnect };
