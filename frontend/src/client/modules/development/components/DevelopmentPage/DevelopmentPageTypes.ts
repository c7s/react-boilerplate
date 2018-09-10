import * as React from 'react';
import { Licenses_licenses } from './DevelopmentPageApolloType';

/** Props */

interface DevelopmentPageOuterProps {}

export interface DevelopmentPageConnectProps extends DevelopmentPageOuterProps {
    articleId: number;
}

export interface MapProps {}

export interface DispatchProps {}

export interface ApolloProps {
    licenses: Licenses_licenses[];
}

export type DevelopmentPageBehaviourProps = DevelopmentPageOuterProps & DispatchProps & MapProps & ApolloProps;

export interface DevelopmentPageBehaviourState {
    counter: number;
}

export interface DevelopmentPageProps {
    counter: number;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
    licenses: Licenses_licenses[];
}

/** Inner props */

/** Custom types */
