import { merge } from 'lodash';
import * as React from 'react';
import { DevelopmentPage, DevelopmentPageThemeName } from '../../../development/pages/DevelopmentPage';
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
            render: () =>
                React.createElement(DevelopmentPage, { name: 'User', themeName: DevelopmentPageThemeName.ALTER }),
        },
        NOT_FOUND: {
            component: NotFoundPage,
        },
    },
    routes,
);
