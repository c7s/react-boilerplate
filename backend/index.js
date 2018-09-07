const express = require('express');
const app = express();
const serverRenderer = require('frontend/dist/server.bundle.js').default;

app.use('/static', express.static('./node_modules/frontend/dist/static'));
app.use(serverRenderer());

app.listen(6060);

console.log('Listen at localhost:6060');
