import * as React from 'react';
import { Link } from 'react-router-dom';

export const RootPage: React.StatelessComponent = () => (
    <div>
        <h1>React-boilerplate</h1>
        <Link to={'/'}>Development</Link>
    </div>
);
