import { LocationState } from 'history';
import { merge, mapValues } from 'lodash';
import queryString from 'query-string';
import * as React from 'react';
import { RouteComponentProps, StaticContext } from 'react-router';
import useReactRouterLib from 'use-react-router';
import { PathData } from './route';
import { routes } from './routes';

interface AppMatch<Params extends PathData = {}> {
    params: Params;
    isExact: boolean;
    path: string;
    url: string;
}

type AppRouteComponentProps<P extends PathData = {}, C extends StaticContext = StaticContext, S = LocationState> = Omit<
    RouteComponentProps<{}, C, S>,
    'match'
> & {
    match: AppMatch<P>;
};

function useReactRouter<
    RouteKey extends keyof typeof routes,
    C extends StaticContext = StaticContext,
    S = LocationState
>(): AppRouteComponentProps<FirstArgument<typeof routes[RouteKey]['pathWithParams']>, C, S> {
    const routeData = useReactRouterLib<{}, C, S>();

    return React.useMemo(
        () => transformRouterComponentProps<FirstArgument<typeof routes[RouteKey]['pathWithParams']>, C, S>(routeData),
        [routeData],
    );
}

function transformRouterComponentProps<
    P extends PathData = {},
    C extends StaticContext = StaticContext,
    S = LocationState
>(props: RouteComponentProps<{}, C, S>): AppRouteComponentProps<P, C, S> {
    return (props.location.search || props.location.hash
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
        : props) as AppRouteComponentProps<P, C, S>;
}

function smartParse(value: string | number | undefined | null | (string | number)[]) {
    try {
        return value && typeof value === 'string' ? JSON.parse(value) : value;
    } catch {
        console.warn("URL inconsistency detected. Don't change it manually");
        return value;
    }
}

export { useReactRouter };
