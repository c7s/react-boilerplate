import { mapValues } from 'lodash';
import queryString from 'query-string';

/**
 * Expects pure value without '#'
 */
export function stringifyHash(hash?: string): string {
    if (hash && hash[0] === '#') {
        throw new Error("Unexpected '#' at hash value start");
    }

    return hash ? `#${hash}` : '';
}

export function stringifyQuery(query?: { [key: string]: unknown }): string {
    return query && Object.values(query).length
        ? `?${queryString.stringify(
              mapValues(query, value => {
                  if (Array.isArray(value)) {
                      return value.map(valueItem => JSON.stringify(valueItem));
                  }
                  return JSON.stringify(value);
              }),
              { arrayFormat: 'bracket' },
          )}`
        : '';
}

export function parseHash(locationHash?: string): { hash?: string } {
    return locationHash ? { hash: locationHash.substr(1) } : {};
}

export function parseQuery(locationSearch?: string): { query?: { [key: string]: unknown } } {
    return locationSearch
        ? {
              query: mapValues(queryString.parse(locationSearch, { arrayFormat: 'bracket' }), value => {
                  if (Array.isArray(value)) {
                      return value.map(tryJsonParse);
                  }

                  return tryJsonParse(value);
              }),
          }
        : {};
}

export function tryJsonParse(value: string | number | undefined | null | (string | number)[]) {
    try {
        return value && typeof value === 'string' ? JSON.parse(value) : value;
    } catch {
        console.warn("URL inconsistency detected. Don't change it manually");
        return value;
    }
}
