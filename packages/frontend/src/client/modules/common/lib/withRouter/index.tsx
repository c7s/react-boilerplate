import { LocationState } from 'history';
import { merge, mapValues } from 'lodash';
import queryString from 'query-string';
import * as React from 'react';
import { Omit, RouteComponentProps, StaticContext, withRouter as withRouterOriginal } from 'react-router';
import compose from 'compose-function';
import useReactRouterLib from 'use-react-router';

/** 'any' is used due to withRouter type definition */

/**
 * @deprecated Use useReactRouter hook instead.
 */
type WithRouter = <P extends RouteComponentProps>(
    Component: React.ComponentType<P>,
) => React.ComponentType<Omit<P, keyof RouteComponentProps>>;

/**
 * @deprecated Use useReactRouter hook instead.
 */
function withRouterParams<P extends RouteComponentProps>(Component: React.ComponentType<P>) {
    return (props: P) => <Component {...transformRouterComponentProps(props) as any} />;
}

export function useReactRouter<
    P extends { [K in keyof P]?: string } = {},
    C extends StaticContext = StaticContext,
    S = LocationState
>(): RouteComponentProps<P, C, S> {
    const routeData = useReactRouterLib<P, C, S>();

    return transformRouterComponentProps(routeData);
}

function transformRouterComponentProps<
    P extends { [K in keyof P]?: string } = {},
    C extends StaticContext = StaticContext,
    S = LocationState
>(props: RouteComponentProps<P, C, S>): RouteComponentProps<P, C, S> {
    return props.location.search || props.location.hash
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
        : props;
}

function smartParse(value: string | undefined | null) {
    try {
        return value ? JSON.parse(value) : value;
    } catch {
        console.warn("URL inconsistency detected. Don't change it manually");
        return value;
    }
}

/**
 * @deprecated Use useReactRouter hook instead.
 */
const withRouter: WithRouter = compose(
    withRouterOriginal,
    withRouterParams,
) as any;

export { withRouter };
