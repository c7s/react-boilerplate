import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client/ApolloClient';
import * as React from 'react';
import { ApolloProvider } from 'react-apollo';
import { hot } from 'react-hot-loader';
import { Route, StaticRouter, StaticRouterProps, Switch } from 'react-router';
import { BrowserRouter, BrowserRouterProps } from 'react-router-dom';
import { routes } from './routes';

// Import assets here (such as external css, html, fonts, etc)

export interface IsomorphicAppProps {
    ssrMode: boolean;
    client: ApolloClient<NormalizedCacheObject>;
    location?: string;
    context?: object;
}

class IsomorphicRouter extends React.Component<{ ssrMode: boolean } & (StaticRouterProps | BrowserRouterProps)> {
    render() {
        return this.props.ssrMode ? <StaticRouter {...this.props} /> : <BrowserRouter {...this.props} />;
    }
}

@hot(module)
export class IsomorphicApp extends React.Component<IsomorphicAppProps> {
    render() {
        return (
            <ApolloProvider client={this.props.client}>
                <IsomorphicRouter
                    ssrMode={this.props.ssrMode}
                    location={this.props.location}
                    context={this.props.context}
                >
                    <Switch>
                        {Object.values(routes).map(route => (
                            <Route key={route.name} {...route} />
                        ))}
                    </Switch>
                </IsomorphicRouter>
            </ApolloProvider>
        );
    }
}
