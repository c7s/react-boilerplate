import * as React from 'react';
import { renderToString } from 'react-dom/server';

export interface HtmlProps {
    styleTags: string;
    spriteContent: string;
    content: string;
    apolloState: object;
    reduxState: object;
}

export const Html: React.StatelessComponent<HtmlProps> = ({
    styleTags,
    spriteContent,
    content,
    apolloState,
    reduxState,
}) => {
    return (
        <html lang="ru">
            <head
                dangerouslySetInnerHTML={{
                    __html: `${renderToString(
                        <React.Fragment>
                            <meta charSet="utf-8" />
                            <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
                            <meta name="mobile-web-app-capable" content="yes" />
                            <meta name="apple-mobile-web-app-capable" content="yes" />
                            <title>App</title>
                        </React.Fragment>,
                    )}${styleTags}`,
                }}
            />
            <body
                dangerouslySetInnerHTML={{
                    __html: `${spriteContent}${renderToString(
                        <React.Fragment>
                            <div id="root" dangerouslySetInnerHTML={{ __html: content }} />
                            <script
                                dangerouslySetInnerHTML={{
                                    __html: `window.APOLLO_STATE=${JSON.stringify(
                                        apolloState,
                                    )};window.REDUX_STATE=${JSON.stringify(reduxState)};`,
                                }}
                            />
                            <script src={`/${STATIC_DIRECTORY_NAME}/${CLIENT_BUNDLE_NAME}`} />
                        </React.Fragment>,
                    )}`,
                }}
            />
        </html>
    );
};
