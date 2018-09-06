import * as React from 'react';

export interface HtmlProps {
    content: string;
    state: object;
}

export const Html: React.StatelessComponent<HtmlProps> = ({ content, state }) => {
    return (
        <html>
            <head>
                <title>App</title>
            </head>
            <body>
                <div id="root" dangerouslySetInnerHTML={{ __html: content }} />
                <script
                    dangerouslySetInnerHTML={{
                        __html: `window.APOLLO_STATE=${JSON.stringify(state)};`,
                    }}
                />
                <script src="/client.bundle.js" />
            </body>
        </html>
    );
};
