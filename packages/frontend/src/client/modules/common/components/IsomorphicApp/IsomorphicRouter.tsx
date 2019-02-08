import * as React from 'react';
import { StaticRouter, StaticRouterProps } from 'react-router';
import { BrowserRouter, BrowserRouterProps } from 'react-router-dom';

export const IsomorphicRouter: React.ComponentType<StaticRouterProps | BrowserRouterProps> = props =>
    SSR_MODE ? <StaticRouter {...props} /> : <BrowserRouter {...props} />;
