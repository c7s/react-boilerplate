import { route } from './route';

/** The source of truth for routes names and types */
export const routes = {
    ROOT: route({
        path: '/',
        exact: true,
    }),
    DEVELOPMENT: route<
        { name: string; id?: string },
        { querySingle: { absolutely: 'anything' }; queryArray: boolean[] },
        'hashValue'
    >({
        path: '/development/:name/:id?',
        isDev: true,
    }),
    SHOWCASE: route({
        path: '/component-showcase',
        isDev: true,
    }),
    APOLLO_DEMO: route({
        path: '/apollo-demo',
        isDev: true,
    }),
    NOT_FOUND: route({
        path: '/',
    }),
};
