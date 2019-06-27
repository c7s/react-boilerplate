import { Location } from 'history';
import pathToRegexp from 'path-to-regexp';
import { RouteProps } from 'react-router';
import { stringifyHash, stringifyQuery } from './transformations';

type PathValue = string | undefined;
type QueryValue = unknown | unknown[];

type PathData<
    Path extends { [key in keyof Path]: PathValue } = {},
    Query extends { [key in keyof Query]: QueryValue } = {},
    Hash extends string = string
> = Path & {
    query?: Partial<Query>;
    hash?: Hash;
};

interface PathWithParams<
    Path extends { [key in keyof Path]: PathValue } = {},
    Query extends { [key in keyof Query]: QueryValue } = {},
    Hash extends string = string
> {
    (params: PathData<Path, Query, Hash>): string;
}

interface LocationWithParams<
    Path extends { [key in keyof Path]: PathValue } = {},
    Query extends { [key in keyof Query]: QueryValue } = {},
    Hash extends string = string,
    State = never
> {
    (params: PathData<Path, Query, Hash>, state?: State): Location<State | undefined>;
}

interface RouteData<
    Path extends { [key in keyof Path]: PathValue } = {},
    Query extends { [key in keyof Query]: QueryValue } = {},
    Hash extends string = string,
    State = never
> extends RouteProps {
    path: string;
    isDev?: boolean;
    pathWithParams: PathWithParams<Path, Query, Hash>;
    locationWithParams: LocationWithParams<Path, Query, Hash, State>;
}

function getPathWithParams<
    Path extends { [key in keyof Path]: PathValue } = {},
    Query extends { [key in keyof Query]: QueryValue } = {},
    Hash extends string = string
>(path: string): PathWithParams<Path, Query, Hash> {
    return params =>
        `${pathToRegexp.compile(path)(params)}${stringifyQuery(params.query)}${stringifyHash(params.hash)}`;
}

function getLocationWithParams<
    Path extends { [key in keyof Path]: PathValue } = {},
    Query extends { [key in keyof Query]: QueryValue } = {},
    Hash extends string = string,
    State = never
>(path: string): LocationWithParams<Path, Query, Hash, State> {
    return (params, state) => ({
        state,
        pathname: pathToRegexp.compile(path)(params),
        search: stringifyQuery(params.query),
        hash: stringifyHash(params.hash),
    });
}

function route<
    Path extends { [key in keyof Path]: PathValue } = {},
    Query extends { [key in keyof Query]: QueryValue } = {},
    Hash extends string = string,
    State = never
>(routeData: RouteProps & { path: string; isDev?: boolean }): RouteData<Path, Query, Hash, State> {
    return {
        ...routeData,
        pathWithParams: getPathWithParams<Path, Query, Hash>(routeData.path),
        locationWithParams: getLocationWithParams<Path, Query, Hash, State>(routeData.path),
    };
}

export { route, PathWithParams, RouteData, PathData };
