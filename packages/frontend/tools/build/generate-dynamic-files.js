const fs = require('fs');
const path = require('path');

try {
    // eslint-disable-next-line import/no-unresolved,global-require
    const { getStaticHtml, publicFiles } = require('../../dist/server.bundle');
    // eslint-disable-next-line import/no-unresolved,global-require
    const reactLoadableStats = require('../../dist/react-loadable');

    /**
     * For development only, to test static version.
     * These files are config-dependent, so they must be regenerated on target machine.
     *
     * NOTE: using static HTML file is discouraged.
     */

    fs.writeFileSync('./dist/public/index.html', getStaticHtml({ reactLoadableStats }), { encoding: 'utf-8' });

    Object.values(publicFiles).forEach(({ path: filePath, content }) => {
        fs.writeFileSync(path.resolve(`./dist/public${filePath}`), content);
    });
} catch (error) {
    if (error.code === 'MODULE_NOT_FOUND') {
        console.error('No dist folder. Build the app first.');
        process.exit(1);
    } else {
        throw error;
    }
}
