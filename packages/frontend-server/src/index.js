const express = require('express');

const app = express();

try {
    /* eslint-disable global-require,import/no-unresolved */
    const serverRenderer = require('frontend/dist/server.bundle.js').default;
    const reactLoadableStats = require('frontend/dist/react-loadable.json');
    /* eslint-enable */

    app.use(express.static('./node_modules/frontend/dist/public'));
    app.use('/static', express.static('./node_modules/frontend/dist/static'));
    app.use(serverRenderer({ reactLoadableStats }));
} catch (e) {
    if (e.code !== 'MODULE_NOT_FOUND') {
        throw e;
    }
    // We're good, frontend (server renderer) is optional dependency
}

app.listen(6060);

/* eslint-disable-next-line no-console */
console.log('Listen at localhost:6060');
