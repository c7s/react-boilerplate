import * as React from 'react';
import { ApolloProvider } from 'react-apollo';
import * as ReactDOM from 'react-dom';
import { App } from './App';
import { apolloClient } from './modules/common/lib/apollo/apolloClient';

ReactDOM.render(
    <ApolloProvider client={apolloClient}>
        <App name={'Name2'} />
    </ApolloProvider>,
    document.getElementById('root'),
);
