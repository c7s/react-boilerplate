import * as React from 'react';
import { Link } from 'react-router-dom';
import { routes } from '../../../routes';

export const RootPage: React.StatelessComponent = () => (
    <div>
        <h1>React-boilerplate</h1>
        <Link to={routes.DEVELOPMENT.path}>Development</Link>
    </div>
);
