import * as React from 'react';
import { Licenses } from './ApolloTypes/Licenses';

/** Props */

interface DevelopmentPageOuterProps {}

export interface DevelopmentPageConnectProps extends DevelopmentPageOuterProps {
    articleId: number;
}

export interface MapProps {}

export interface DispatchProps {}

export interface ApolloProps {
    licenses: Licenses['licenses'];
}

export type DevelopmentPageBehaviourProps = DevelopmentPageOuterProps & DispatchProps & MapProps & ApolloProps;

export interface DevelopmentPageBehaviourState {
    counter: number;
}

export interface DevelopmentPageProps {
    counter: number;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
    licenses: Licenses['licenses'];
}

/** Inner props */

/** Custom types */
