const nodemon = require('nodemon');

// See: https://github.com/remy/nodemon/issues/364#issuecomment-453915987
function start() {
    nodemon({
        script: './src/dev-server',
        /**
         *  Restarting dev server on configs change is irrational because it causes full build,
         *  while configs change itself causes incremental build.
         *
         *  TL;DR: Do not add 'config/app' here.
         */
        watch: ['src/dev-server', 'webpack.config.js', 'babel.config.js', 'config/dev-server'],
    });
    nodemon
        .on('crash', () => {
            /* eslint-disable-next-line no-console */
            console.log('Dev server crashed, restarting...');
            start();
        })
        .on('restart', files => {
            /* eslint-disable-next-line no-console */
            console.log('Dev server restarted due to: ', files);
        });
}

start();
