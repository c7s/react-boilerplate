import { LocationState } from 'history';
import { merge } from 'lodash';
import * as React from 'react';
import { RouteComponentProps, StaticContext } from 'react-router';
import useReactRouterLib from 'use-react-router';
import { PathData } from './route';
import { routes } from './routes';
import { parseHash, parseQuery } from './transformations';

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
                  params: merge({}, parseQuery(props.location.search), parseHash(props.location.hash)),
              },
          })
        : props) as AppRouteComponentProps<P, C, S>;
}

export { useReactRouter };
