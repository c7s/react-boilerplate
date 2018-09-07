import * as React from 'react';

export interface HtmlProps {
    styleTags: string;
    content: string;
    state: object;
}

export const Html: React.StatelessComponent<HtmlProps> = ({ styleTags, content, state }) => {
    return (
        <html lang="ru">
            <head
                dangerouslySetInnerHTML={{
                    __html: `<meta charset="utf-8">
                             <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
                             <meta name="mobile-web-app-capable" content="yes">
                             <meta name="apple-mobile-web-app-capable" content="yes">
                             <title>App</title>
                             ${styleTags}`,
                }}
            />
            <body>
                <div id="root" dangerouslySetInnerHTML={{ __html: content }} />
                <script
                    dangerouslySetInnerHTML={{
                        __html: `window.APOLLO_STATE=${JSON.stringify(state)};`,
                    }}
                />
                <script src="/static/client.bundle.js" />
            </body>
        </html>
    );
};
