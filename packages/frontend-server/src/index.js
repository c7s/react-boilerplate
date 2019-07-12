const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

try {
    /* eslint-disable global-require,import/no-unresolved */
    const { default: serverRenderer, publicFiles, getStaticHtml } = require('frontend/dist/server.bundle.js');
    const reactLoadableStats = require('frontend/dist/react-loadable.json');
    /* eslint-enable */

    // Create public files in 'public' to serve from '/'
    Object.values(publicFiles).forEach(({ path: filePath, content }) => {
        fs.writeFileSync(path.resolve(`./node_modules/frontend/dist/public${filePath}`), content);
    });

    // Ensure that index.html existence matches SSR status
    if (process.env.REACT_BOILERPLATE_IS_DISABLE_SSR) {
        fs.writeFileSync(
            path.resolve('./node_modules/frontend/dist/public/index.html'),
            getStaticHtml({ reactLoadableStats })
        );
    } else if (fs.existsSync(path.resolve('./node_modules/frontend/dist/public/index.html'))) {
        fs.unlinkSync(path.resolve('./node_modules/frontend/dist/public/index.html'));
    }

    app.use(express.static('./node_modules/frontend/dist/public'));
    app.use('/static', express.static('./node_modules/frontend/dist/static'));

    if (process.env.REACT_BOILERPLATE_IS_DISABLE_SSR) {
        app.use('*', express.static('./node_modules/frontend/dist/public/index.html'));
    } else {
        app.use(serverRenderer({ reactLoadableStats }));
    }
} catch (error) {
    if (error.code !== 'MODULE_NOT_FOUND') {
        throw error;
    }
    // We're good, frontend (server renderer) is optional dependency
}

app.listen(6060);

/* eslint-disable-next-line no-console */
console.log('Listen at localhost:6060');
