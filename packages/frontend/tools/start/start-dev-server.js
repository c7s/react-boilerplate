const nodemon = require('nodemon');

// See: https://github.com/remy/nodemon/issues/364#issuecomment-453915987
function start() {
    nodemon({
        script: './src/dev-server',
        /**
         *  Restarting dev server on configs change is irrational because it causes full build,
         *  while configs change itself causes incremental build.
         *
         *  The only issue is devServerPort. Change it and touch dev-server/index.js to cause dev server restart.
         *
         *  TL;DR: Do not add 'config' here.
         */
        watch: ['src/dev-server', 'webpack.config.js'],
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
