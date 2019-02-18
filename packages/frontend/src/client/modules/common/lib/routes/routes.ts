import { route } from './route';

/** The source of truth for routes names and types */
export const routes = {
    ROOT: route({
        path: '/',
        name: 'ROOT',
        exact: true,
    }),
    DEVELOPMENT: route<'name', 'id', 'querySingle' | 'querySingle2', 'queryArray', 'hashValue'>({
        path: '/development/:name/:id?',
        name: 'DEVELOPMENT',
    }),
    SHOWCASE: route({
        path: '/showcase',
        name: 'SHOWCASE',
    }),
    NOT_FOUND: route({
        path: '/',
        name: 'NOT_FOUND',
    }),
};
