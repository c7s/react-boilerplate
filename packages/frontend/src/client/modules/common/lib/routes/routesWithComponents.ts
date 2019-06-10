import { merge } from 'lodash';
import * as React from 'react';
import { AdminPage } from '../../../admin/pages/AdminPage';
import { ApolloDemoPage } from '../../../development/pages/ApolloDemoPage';
import { DevelopmentPage } from '../../../development/pages/DevelopmentPage';
import { ShowcasePage } from '../../../development/pages/ShowcasePage';
import { RootPage } from '../../../root/pages/RootPage';
import { NotFoundPage } from '../../pages/NotFoundPage';
import { routes } from './routes';

/** The source of truth for mapping components to routes. Should only be used once (in App component) */
export const routesWithComponents = merge<{ [P in keyof typeof routes]: Partial<(typeof routes)[P]> }, typeof routes>(
    {
        ROOT: {
            component: RootPage,
        },
        DEVELOPMENT: {
            render: () => React.createElement(DevelopmentPage, { name: 'User' }),
        },
        SHOWCASE: {
            component: ShowcasePage,
        },
        APOLLO_DEMO: {
            component: ApolloDemoPage,
        },
        ADMIN: {
            component: AdminPage,
        },
        NOT_FOUND: {
            component: NotFoundPage,
        },
    },
    routes,
);
