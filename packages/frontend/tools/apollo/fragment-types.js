#!/usr/bin/env node

const fs = require('fs');
const pick = require('lodash/pick');

const IS_CALLED_FROM_SHELL = module.parent === null;

function generateFragmentTypes() {
    const schema = JSON.parse(fs.readFileSync('graphql.schema.json', { encoding: 'utf-8' }));

    // eslint-disable-next-line no-underscore-dangle
    const filteredData = schema.__schema.types
        .filter(type => type.possibleTypes !== null)
        .map(type => {
            const typePart = pick(type, ['kind', 'name', 'possibleTypes']);
            typePart.possibleTypes = typePart.possibleTypes.map(possibleType => pick(possibleType, 'name'));
            return typePart;
        });

    const result = {
        __schema: {
            types: filteredData,
        },
    };

    fs.writeFileSync('./src/client/modules/common/graphql/fragmentTypes.json', JSON.stringify(result));
}

if (IS_CALLED_FROM_SHELL) {
    generateFragmentTypes();
}

module.exports = { generateFragmentTypes };
