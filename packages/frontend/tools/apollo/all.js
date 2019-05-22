#!/usr/bin/env node

const { generateConfig } = require('./config');
const { generateSchema } = require('./schema');
const { generateTypes } = require('./types');

generateSchema()
    .then(() => {
        generateConfig();
        generateTypes();
    })
    .catch(error => console.error(error));
