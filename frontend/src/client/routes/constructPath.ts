import * as pathToRegexp from 'path-to-regexp';
import * as queryString from 'querystring';

type PathData<PATH extends string = never, QUERY extends string = never> = { [key in PATH]: string } & {
    query?: QUERY extends string ? { [key in QUERY]?: string } : never;
};

export interface Path<PATH extends string = never, QUERY extends string = never> {
    pathWithParams(params: PathData<PATH, QUERY>): string;
    path: string;
}

export function constructPath<PATH extends string = never, QUERY extends string = never>(
    path: string,
): Path<PATH, QUERY> {
    return {
        pathWithParams(params) {
            return `${pathToRegexp.compile(path)(params)}${
                params.query && Object.values(params.query).length ? `?${queryString.stringify(params.query)}` : ''
            }`;
        },
        path,
    };
}
