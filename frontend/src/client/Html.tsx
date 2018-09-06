import * as React from 'react';

export interface HtmlProps {
    styleTags: string;
    content: string;
    state: object;
}

export const Html: React.StatelessComponent<HtmlProps> = ({ styleTags, content, state }) => {
    return (
        <html>
            <head dangerouslySetInnerHTML={{ __html: `<title>App</title>${styleTags}` }} />
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
