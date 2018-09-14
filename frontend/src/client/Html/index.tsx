import * as React from 'react';
import { renderToString } from 'react-dom/server';
import appleTouchIcon from './favicon/apple-touch-icon.png';
import favicon16x16 from './favicon/favicon-16x16.png';
import favicon32x32 from './favicon/favicon-32x32.png';
import favicon from './favicon/favicon.ico';
import safariPinnedTab from './favicon/safari-pinned-tab.svg';

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

                            <link rel="apple-touch-icon" sizes="180x180" href={appleTouchIcon} />
                            <link rel="icon" type="image/png" sizes="32x32" href={favicon32x32} />
                            <link rel="icon" type="image/png" sizes="16x16" href={favicon16x16} />
                            {/*<link rel="manifest" href="/site.webmanifest" />*/}
                            <link rel="mask-icon" href={safariPinnedTab} color="#5bbad5" />
                            <link rel="shortcut icon" href={favicon} />
                            <meta name="apple-mobile-web-app-title" content="React Boilerplate" />
                            <meta name="application-name" content="React Boilerplate" />
                            <meta name="msapplication-TileColor" content="#da532c" />
                            {/*<meta name="msapplication-config" content="/static/browserconfig.xml">*/}
                            <meta name="theme-color" content="#ffffff" />

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
