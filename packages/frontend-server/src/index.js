const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

try {
    /* eslint-disable global-require,import/no-unresolved */
    const { default: serverRenderer, publicFiles } = require('frontend/dist/server.bundle.js');
    const reactLoadableStats = require('frontend/dist/react-loadable.json');
    /* eslint-enable */

    // Create public files and serve them from '/' with correct headers
    Object.values(publicFiles).forEach(({ path: filePath, content, contentType }) => {
        fs.writeFileSync(path.resolve(`./node_modules/frontend/dist/public${filePath}`), content);

        app.use(filePath, (req, res, next) => {
            res.header('Content-Type', contentType);
            next();
        });
    });

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
