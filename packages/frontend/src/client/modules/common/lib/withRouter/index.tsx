import { merge } from 'lodash';
import queryString from 'query-string';
import * as React from 'react';
import { Omit, RouteComponentProps, withRouter as withRouterOriginal } from 'react-router';
import { compose } from 'redux';

/** 'any' is used due to withRouter type definition */

type WithRouter = <P extends RouteComponentProps<any>>(
    Component: React.ComponentType<P>,
) => React.ComponentType<Omit<P, keyof RouteComponentProps<any>>>;

function withRouterParams<P extends RouteComponentProps<any>>(Component: React.ComponentType<P>) {
    return (props: P) => (
        <Component
            {...(props.location.search || props.location.hash
                ? merge({}, props, {
                      match: {
                          params: merge(
                              {},
                              props.location.search ? { query: queryString.parse(props.location.search) } : {},
                              props.location.hash ? { hash: props.location.hash } : {},
                          ),
                      },
                  })
                : props)}
        />
    );
}

const withRouter: WithRouter = compose(
    withRouterOriginal,
    withRouterParams,
);

export { withRouter };
