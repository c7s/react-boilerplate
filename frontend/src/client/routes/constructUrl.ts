import * as pathToRegexp from 'path-to-regexp';
import * as queryString from 'querystring';

export type UrlData<PathUnion extends string = never, QueryUnion extends string = never> = (PathUnion extends string
    ? {
          path: PathUnion extends string ? { [key in PathUnion]: string } : never;
      }
    : {}) &
    (QueryUnion extends string
        ? {
              query?: QueryUnion extends string ? { [key in QueryUnion]?: string } : never;
          }
        : {});

export interface Url<Path extends string = never, Query extends string = never> {
    withParams(params: UrlData<Path, Query>): string;
    raw(): string;
}

export function constructUrl<Path extends string = never, Query extends string = never>(
    path: string,
): Url<Path, Query> {
    return {
        withParams(params) {
            return `${pathToRegexp.compile(path)(params.path)}${
                params.query && Object.values(params.query) ? `?${queryString.stringify(params.query)}` : ''
            }`;
        },
        raw() {
            return path;
        },
    };
}
