import { css } from 'styled-components';
import { FontFamily, fontFamilyConfig } from './fontFamilyConfig';

function fontFamily(fontFamily: FontFamily) {
    return css`
        font-family: ${fontFamily}, ${fontFamilyConfig[fontFamily].fallbackStack};
    `;
}

export { fontFamily };
