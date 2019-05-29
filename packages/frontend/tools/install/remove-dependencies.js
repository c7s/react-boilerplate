#!/usr/bin/env node

const del = require('del');

// TODO: Remove this hack when issue is resolved
// https://github.com/DefinitelyTyped/DefinitelyTyped/issues/33311
del.sync(['./node_modules/@types/react-native']);
