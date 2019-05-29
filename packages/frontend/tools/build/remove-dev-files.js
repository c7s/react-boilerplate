const del = require('del');

del.sync(['**', '**/.*', '!dist/**', '!package.json']);
