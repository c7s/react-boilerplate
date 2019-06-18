import { LocationState } from 'history';
import { merge } from 'lodash';
import * as React from 'react';
import { RouteComponentProps, StaticContext } from 'react-router';
import useReactRouterLib from 'use-react-router';
import { PathData } from './route';
import { routes } from './routes';
import { parseHash, parseQuery } from './transformations';

interface RouterStaticContext extends StaticContext {}

interface AppMatch<Params extends PathData = {}> {
    params: Params;
    isExact: boolean;
    path: string;
    url: string;
}

type AppRouteComponentProps<P extends PathData = {}, S = LocationState> = Omit<
    RouteComponentProps<{}, RouterStaticContext, S>,
    'match'
> & {
    match: AppMatch<P>;
};

function useReactRouter<RouteKey extends keyof typeof routes>(): AppRouteComponentProps<
    FirstArgument<typeof routes[RouteKey]['locationWithParams']>,
    SecondArgument<typeof routes[RouteKey]['locationWithParams']>
> {
    const routeData = useReactRouterLib<
        {},
        RouterStaticContext,
        SecondArgument<typeof routes[RouteKey]['locationWithParams']>
    >();

    return React.useMemo(
        () =>
            transformRouterComponentProps<
                FirstArgument<typeof routes[RouteKey]['locationWithParams']>,
                RouterStaticContext,
                SecondArgument<typeof routes[RouteKey]['locationWithParams']>
            >(routeData),
        [routeData],
    );
}

function transformRouterComponentProps<
    P extends PathData = {},
    C extends StaticContext = StaticContext,
    S = LocationState
>(props: RouteComponentProps<{}, C, S>): AppRouteComponentProps<P, S> {
    return (props.location.search || props.location.hash
        ? merge({}, props, {
              match: {
                  params: merge({}, parseQuery(props.location.search), parseHash(props.location.hash)),
              },
          })
        : props) as AppRouteComponentProps<P, S>;
}

export { useReactRouter };
