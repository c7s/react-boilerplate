import * as RHL from 'react-hot-loader';

let isomorphicHot: typeof RHL.hot = () => component => component;
if (!SSR_MODE) {
    isomorphicHot = require('react-hot-loader').hot;
}

export { isomorphicHot };
