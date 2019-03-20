const nodemon = require('nodemon');

// See: https://github.com/remy/nodemon/issues/364#issuecomment-453915987
function start() {
    nodemon({
        script: './tools/apollo/all',
        watch: ['config'],
        args: ['--watch'],
    });
    nodemon
        .on('crash', () => {
            /* eslint-disable-next-line no-console */
            console.log('Apollo generation crashed, restarting...');
            start();
        })
        .on('restart', files => {
            /* eslint-disable-next-line no-console */
            console.log('Apollo generation restarted due to: ', files);
        });
}

start();
