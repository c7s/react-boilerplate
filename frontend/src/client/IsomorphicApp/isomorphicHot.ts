import * as RHL from 'react-hot-loader';

let hot: typeof RHL.hot = () => component => component;
if (!SSR_MODE) {
    hot = require('react-hot-loader').hot;
}

export { hot };
