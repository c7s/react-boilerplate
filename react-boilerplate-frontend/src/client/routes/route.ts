import pathToRegexp from 'path-to-regexp';
import queryString from 'query-string';
import { RouteProps } from 'react-router';

type PathData<PATH extends string = never, QUERY extends string = never> = { [key in PATH]: string } & {
    query?: QUERY extends string ? { [key in QUERY]?: string } : never;
};

interface PathWithParams<PATH extends string = never, QUERY extends string = never> {
    (params: PathData<PATH, QUERY>): string;
}

function getPathWithParams<PATH extends string = never, QUERY extends string = never>(
    path: string,
): PathWithParams<PATH, QUERY> {
    return params => {
        return `${pathToRegexp.compile(path)(params)}${
            params.query && Object.values(params.query).length ? `?${queryString.stringify(params.query)}` : ''
        }`;
    };
}

function route<PATH extends string = never, QUERY extends string = never>(
    routeData: RouteProps & { name: string; path: string },
) {
    return { ...routeData, pathWithParams: getPathWithParams<PATH, QUERY>(routeData.path) };
}

export { route };
