import { merge, mapValues } from 'lodash';
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
                              props.location.search
                                  ? {
                                        query: mapValues(
                                            queryString.parse(props.location.search, { arrayFormat: 'bracket' }),
                                            value => {
                                                if (Array.isArray(value)) {
                                                    return value.map(smartParse);
                                                }

                                                return smartParse(value);
                                            },
                                        ),
                                    }
                                  : {},
                              props.location.hash ? { hash: props.location.hash } : {},
                          ),
                      },
                  })
                : props)}
        />
    );
}

function smartParse(value: string | undefined) {
    try {
        return value ? JSON.parse(value) : value;
    } catch {
        console.warn("URL inconsistency detected. Don't change it manually");
        return value;
    }
}

const withRouter: WithRouter = compose(
    withRouterOriginal,
    withRouterParams,
);

export { withRouter };
