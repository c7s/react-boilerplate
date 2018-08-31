import * as React from 'react';
import { renderToString } from 'react-dom/server';
import {HotApp} from './App';

export default function serverRenderer() {
    return (req: any, res: any, next: any) => {
        res.status(200).send(`
            <!doctype html>
            <html>
            <head>
                <title>App</title>
            </head>
            <body>
                <div id="root">
                    ${renderToString(React.createElement(HotApp,{name: 'Name1'}))}
                </div>
                <script src="/client.bundle.js"></script>
            </body>
            </html>
        `);
    };
}