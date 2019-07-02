#!/usr/bin/env node

const { generateSchema } = require('./schema');
const { generateFragmentTypes } = require('./fragment-types');
const { generateConfig } = require('./config');
const { generateTypes } = require('./types');

generateSchema()
    .then(() => {
        generateFragmentTypes();
        generateConfig();
        generateTypes();
    })
    .catch(error => console.error(error));
