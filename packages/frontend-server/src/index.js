const express = require('express');

const app = express();

try {
    app.use(express.static('./node_modules/frontend/dist/public'));
    app.use('/static', express.static('./node_modules/frontend/dist/static'));
    /* eslint-disable global-require */
    app.use(
        require('frontend/dist/server.bundle.js').default({
            reactLoadableStats: require('frontend/dist/react-loadable.json'),
        })
    );
    /* eslint-enable */
} catch (e) {
    // Okay, no server renderer
}

app.listen(6060);

/* eslint-disable-next-line no-console */
console.log('Listen at localhost:6060');
