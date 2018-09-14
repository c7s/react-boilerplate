import { Dictionary } from 'lodash';
import * as React from 'react';
import { RouteProps } from 'react-router';
import { DevelopmentPage, DevelopmentPageThemeName } from '../modules/development/components/DevelopmentPage';
import { RootPage } from '../modules/root/components/RootPage';

export const routes: Dictionary<RouteProps & { name: string } & { path: string }> = {
    ROOT: {
        path: '/',
        name: 'ROOT',
        exact: true,
        component: RootPage,
    },
    DEVELOPMENT: {
        path: '/development/:id',
        name: 'DEVELOPMENT',
        render: () => <DevelopmentPage name={'User'} themeName={DevelopmentPageThemeName.ALTER} />,
    },
};
