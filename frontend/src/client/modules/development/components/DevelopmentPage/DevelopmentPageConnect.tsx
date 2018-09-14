import gql from 'graphql-tag';
import * as React from 'react';
import { Query } from 'react-apollo';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';
import { bindActionCreators, Dispatch } from 'redux';
import { StoreState } from '../../../../IsomorphicStore';
import { StyledComponentsProps } from '../../../common/lib/BaseProps';
import { onRootVisit } from '../../../common/store/actions';
import { LoadedFontStatus } from '../../../common/store/types';
import { Licenses } from './ApolloTypes/Licenses';
import { ThemeName } from './DevelopmentPage';
import { DevelopmentPageBehaviour } from './DevelopmentPageBehaviour';

export interface Props extends StyledComponentsProps<ThemeName> {
    name?: string;
}

export type ReduxProps = Props & RouteComponentProps<{ id: string }> & StyledComponentsProps<ThemeName>;

export interface MapProps {
    loadedFontStatus: LoadedFontStatus;
}

export interface DispatchProps {
    onRootVisit(): void;
}

export type ApolloProps = Props & ReduxProps & MapProps & DispatchProps & StyledComponentsProps<ThemeName>;

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
        <Query<Partial<Licenses>> query={LICENSES_QUERY}>
            {licenses => <DevelopmentPageBehaviour {...props} id={props.match.params.id} licenses={licenses} />}
        </Query>
    )),
);

function mapStateToProps(state: StoreState, ownProps: ReduxProps): MapProps {
    console.log(`${ownProps.name} could also be used`);
    return {
        loadedFontStatus: state.common.loadedFontStatus,
    };
}

function mapDispatchToProps(dispatch: Dispatch, ownProps: ReduxProps): DispatchProps {
    console.log(`${ownProps.name} could also be used`);
    return bindActionCreators(
        {
            onRootVisit,
        },
        dispatch,
    );
}

export { DevelopmentPageConnect };
