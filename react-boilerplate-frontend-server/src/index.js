const express = require('express');
const app = express();
const serverRenderer = require('frontend/dist/server.bundle.js').default;
const reactLoadableStats = require('frontend/dist/react-loadable.json');

app.use('/static', express.static('./node_modules/frontend/dist/static'));
app.use(serverRenderer({reactLoadableStats}));

app.listen(6060);

console.log('Listen at localhost:6060');
