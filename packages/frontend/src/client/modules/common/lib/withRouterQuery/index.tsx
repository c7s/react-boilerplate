import * as H from 'history';
import queryString from 'query-string';
import * as React from 'react';
import { Omit, RouteComponentProps, StaticContext, withRouter } from 'react-router';
import { compose } from 'redux';

type RouteComponentPropsQuery<P, Q, C extends StaticContext = StaticContext, S = H.LocationState> = RouteComponentProps<
    P,
    C,
    S
> & {
    queryParams: Q;
};

/** 'any' is used due to withRouter type definition */

type WithRouter = <P extends RouteComponentPropsQuery<any, any>>(
    Component: React.ComponentType<P>,
) => React.ComponentType<Omit<P, keyof RouteComponentPropsQuery<any, any>>>;

function withRouterQueryParams<P extends RouteComponentPropsQuery<any, any>>(Component: React.ComponentType<P>) {
    return (props: P) => <Component {...props} queryParams={queryString.parse(props.location.search)} />;
}

const withRouterQuery: WithRouter = compose(
    withRouter,
    withRouterQueryParams,
);

export { withRouterQuery, RouteComponentPropsQuery };
