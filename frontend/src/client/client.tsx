import * as React from 'react';
import { ApolloProvider } from 'react-apollo';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import { isomorphicApolloClientFactory } from './modules/common/lib/apollo';

ReactDOM.hydrate(
    <ApolloProvider client={isomorphicApolloClientFactory({ ssrMode: false })}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </ApolloProvider>,
    document.getElementById('root'),
);
