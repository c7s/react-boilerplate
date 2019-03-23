#!/usr/bin/env node

const createSymlink = require('create-symlink');
const fs = require('fs');
const path = require('path');

/** Hack to provide prettier.cmd on linux and therefore use shareable prettier watcher */
if (!fs.existsSync(path.resolve(process.cwd(), 'node_modules/.bin/prettier.cmd'))) {
    createSymlink(
        path.resolve(process.cwd(), 'node_modules/.bin/prettier'),
        path.resolve(process.cwd(), 'node_modules/.bin/prettier.cmd')
    );
}
