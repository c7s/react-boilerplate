import { route } from './route';

/** The source of truth for routes names and types */
export const routes = {
    ROOT: route({
        path: '/',
        exact: true,
    }),
    DEVELOPMENT: route<'name', 'id', 'querySingle' | 'querySingle2', 'queryArray', 'hashValue'>({
        path: '/development/:name/:id?',
    }),
    SHOWCASE: route({
        path: '/showcase',
    }),
    NOT_FOUND: route({
        path: '/',
    }),
};
