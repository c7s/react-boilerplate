import pathToRegexp from 'path-to-regexp';
import { RouteProps } from 'react-router';
import { stringifyHash, stringifyQuery } from './transformations';

interface PathBase {
    [key: string]: string | undefined;
}
interface QueryBase {
    [key: string]: unknown | unknown[];
}

type PathData<
    Path extends PathBase = PathBase,
    Query extends QueryBase = QueryBase,
    Hash extends string = string
> = Path & {
    query?: Partial<Query>;
    hash?: Hash;
};

interface PathWithParams<
    Path extends PathBase = PathBase,
    Query extends QueryBase = QueryBase,
    Hash extends string = string
> {
    (params: PathData<Path, Query, Hash>): string;
}

interface RouteData<
    Path extends PathBase = PathBase,
    Query extends QueryBase = QueryBase,
    Hash extends string = string
> extends RouteProps {
    path: string;
    isDev?: boolean;
    pathWithParams: PathWithParams<Path, Query, Hash>;
}

function getPathWithParams<
    Path extends PathBase = PathBase,
    Query extends QueryBase = QueryBase,
    Hash extends string = string
>(path: string): PathWithParams<Path, Query, Hash> {
    return params => {
        return `${pathToRegexp.compile(path)(params)}${stringifyQuery(params.query)}${stringifyHash(params.hash)}`;
    };
}

function route<Path extends PathBase = PathBase, Query extends QueryBase = QueryBase, Hash extends string = string>(
    routeData: RouteProps & { path: string; isDev?: boolean },
): RouteData<Path, Query, Hash> {
    return {
        ...routeData,
        pathWithParams: getPathWithParams<Path, Query, Hash>(routeData.path),
    };
}

export { route, PathWithParams, RouteData, PathData };
