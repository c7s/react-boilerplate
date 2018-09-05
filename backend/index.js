const express = require('express');
const path = require('path');
const app = express();
const serverRenderer = require('frontend/dist/server.bundle.js').default;

app.use(express.static('./node_modules/frontend/dist'));
app.use(serverRenderer());

app.listen(6060);

console.log('Listen at localhost:6060');