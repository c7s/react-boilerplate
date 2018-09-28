const { stringifyRequest } = require('loader-utils');

/**
 * @param {Object} symbol
 * @return {string}
 */
function stringifySymbol(symbol) {
    return JSON.stringify({
        id: symbol.id,
        use: symbol.useId,
        viewBox: symbol.viewBox,
        content: symbol.render(),
    });
}

module.exports = function runtimeGenerator({ symbol, config, context }) {
    const { spriteModule, symbolModule } = config;

    const spriteRequest = stringifyRequest({ context }, spriteModule);
    const symbolRequest = stringifyRequest({ context }, symbolModule);
    const displayName = `${symbol.id}`;

    return `
    import React from 'react';
    import SpriteSymbol from ${symbolRequest};
    import sprite from ${spriteRequest};
    import styled from 'styled-components';
    import { svgAttributesList, extractProps } from 'modules/common/lib/attributes-list';

    const symbol = new SpriteSymbol(${stringifySymbol(symbol)});
    sprite.add(symbol);
    const ${displayName} = (props) => (
        React.createElement('svg', {
            ...extractProps(props, svgAttributesList),
            children: React.createElement('use', {
                xlinkHref: "#" + "${symbol.id}"
            })
        })
    )
    
    const Styled${displayName} = styled(${displayName})(['vertical-align: bottom; fill: currentColor;']);

    export {Styled${displayName}, Styled${displayName} as Icon};
    export default Styled${displayName};
  `;
};
